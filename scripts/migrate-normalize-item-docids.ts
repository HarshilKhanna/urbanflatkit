/**
 * scripts/migrate-normalize-item-docids.ts
 *
 * Normalizes legacy `items` documents so Firestore doc ID === item.id.
 * This prevents optimistic UI updates from reverting due to ID mismatches.
 *
 * Conflict strategy:
 * - If target doc (items/{item.id}) does not exist: copy + delete old doc.
 * - If target doc exists:
 *   - If contents are identical (except id field), delete old duplicate.
 *   - If contents differ, keep both and report a conflict for manual review.
 *
 * Run from project root:
 *   npm run migrate:normalize-item-docids
 */

import * as admin from "firebase-admin";
import { readFileSync } from "fs";
import { resolve } from "path";

const serviceAccountPath = resolve(process.cwd(), "secrets/serviceAccount.json");

let serviceAccount: admin.ServiceAccount;
try {
  serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf-8"));
} catch {
  console.error(
    "\n❌  Could not read secrets/serviceAccount.json\n" +
      "    Download it from Firebase Console → Project Settings → Service Accounts\n" +
      "    and save it as secrets/serviceAccount.json\n"
  );
  process.exit(1);
}

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

type ItemDoc = {
  id?: unknown;
  [key: string]: unknown;
};

function normalizeForCompare(input: Record<string, unknown>): string {
  const sorted = Object.keys(input)
    .sort()
    .reduce<Record<string, unknown>>((acc, key) => {
      acc[key] = input[key];
      return acc;
    }, {});
  return JSON.stringify(sorted);
}

function stripTransientFields(data: ItemDoc): Record<string, unknown> {
  const copy = { ...data } as Record<string, unknown>;
  delete copy.id;
  return copy;
}

async function main() {
  console.log("\n🔄  Normalizing item document IDs...\n");

  const snap = await db.collection("items").get();
  const docs = snap.docs;

  let scanned = 0;
  let moved = 0;
  let removedDuplicates = 0;
  let skippedNoId = 0;
  let skippedAlreadyNormalized = 0;
  const conflicts: Array<{ oldDocId: string; targetDocId: string }> = [];

  for (const d of docs) {
    scanned++;
    const data = d.data() as ItemDoc;
    const itemId = typeof data.id === "string" ? data.id.trim() : "";

    if (!itemId) {
      skippedNoId++;
      continue;
    }
    if (d.id === itemId) {
      skippedAlreadyNormalized++;
      continue;
    }

    const targetRef = db.collection("items").doc(itemId);
    const targetSnap = await targetRef.get();

    // Move old doc to canonical doc id if target doesn't exist.
    if (!targetSnap.exists) {
      const batch = db.batch();
      batch.set(targetRef, { ...data, id: itemId });
      batch.delete(d.ref);
      await batch.commit();
      moved++;
      continue;
    }

    // Target exists: compare payloads excluding `id`.
    const targetData = targetSnap.data() as ItemDoc;
    const same =
      normalizeForCompare(stripTransientFields(data)) ===
      normalizeForCompare(stripTransientFields(targetData));

    if (same) {
      await d.ref.delete();
      removedDuplicates++;
      continue;
    }

    conflicts.push({ oldDocId: d.id, targetDocId: itemId });
  }

  console.log(`   ✓  Scanned: ${scanned}`);
  console.log(`   ✓  Moved to canonical doc IDs: ${moved}`);
  console.log(`   ✓  Removed duplicate legacy docs: ${removedDuplicates}`);
  console.log(`   ✓  Skipped (missing item.id): ${skippedNoId}`);
  console.log(`   ✓  Skipped (already normalized): ${skippedAlreadyNormalized}`);
  console.log(`   ✓  Conflicts requiring manual review: ${conflicts.length}`);

  if (conflicts.length > 0) {
    console.log("\n⚠️  Conflicts:");
    for (const c of conflicts) {
      console.log(`   - old: items/${c.oldDocId} -> target: items/${c.targetDocId}`);
    }
  }

  console.log("\n✅  Item doc ID normalization complete.\n");
}

main().catch((err) => {
  console.error("\n❌  Item doc ID normalization failed:", err, "\n");
  process.exit(1);
});

