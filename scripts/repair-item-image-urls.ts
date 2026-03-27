/**
 * scripts/repair-item-image-urls.ts
 *
 * Scans Firestore `items` docs for stale Firebase Storage URLs and optionally clears them.
 *
 * Modes:
 * - Dry run (default): reports invalid URLs, no writes
 * - Apply mode: pass --apply to clear invalid imageUrl fields to ""
 *
 * Run from project root:
 *   npx tsx scripts/repair-item-image-urls.ts
 *   npx tsx scripts/repair-item-image-urls.ts --apply
 */

import * as admin from "firebase-admin";
import { readFileSync } from "fs";
import { resolve } from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const APPLY = process.argv.includes("--apply");
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

const configuredBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const fallbackBucket = `${serviceAccount.projectId}.appspot.com`;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: configuredBucket || fallbackBucket,
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

type ItemDoc = {
  id?: unknown;
  imageUrl?: unknown;
  [key: string]: unknown;
};

function extractStoragePath(imageUrl: string): string | null {
  // Expected: https://firebasestorage.googleapis.com/v0/b/<bucket>/o/<encodedPath>?...
  const marker = "/o/";
  const markerIndex = imageUrl.indexOf(marker);
  if (markerIndex === -1) return null;

  const after = imageUrl.slice(markerIndex + marker.length);
  const encodedPath = after.split("?")[0];
  if (!encodedPath) return null;

  try {
    return decodeURIComponent(encodedPath);
  } catch {
    return null;
  }
}

function isFirebaseStorageHttpUrl(url: string): boolean {
  return url.startsWith("https://firebasestorage.googleapis.com/");
}

async function main() {
  console.log("\n🧹  Repairing stale item image URLs...");
  console.log(`   Mode: ${APPLY ? "APPLY (writes enabled)" : "DRY RUN (no writes)"}\n`);

  const snap = await db.collection("items").get();
  const docs = snap.docs;

  let scanned = 0;
  let skippedEmpty = 0;
  let skippedNonStorage = 0;
  let valid = 0;
  let invalid = 0;
  let updated = 0;
  const invalidRows: Array<{ docId: string; itemId: string; imageUrl: string; storagePath: string }> = [];

  const BATCH_SIZE = 400;
  let batch = db.batch();
  let batchOps = 0;

  for (const d of docs) {
    scanned++;
    const data = d.data() as ItemDoc;
    const imageUrl = typeof data.imageUrl === "string" ? data.imageUrl.trim() : "";
    const itemId = typeof data.id === "string" && data.id.trim() ? data.id.trim() : d.id;

    if (!imageUrl) {
      skippedEmpty++;
      continue;
    }

    if (!isFirebaseStorageHttpUrl(imageUrl)) {
      skippedNonStorage++;
      continue;
    }

    const storagePath = extractStoragePath(imageUrl);
    if (!storagePath) {
      invalid++;
      invalidRows.push({ docId: d.id, itemId, imageUrl, storagePath: "(unparseable)" });
      if (APPLY) {
        batch.update(d.ref, { imageUrl: "" });
        batchOps++;
      }
    } else {
      const [exists] = await bucket.file(storagePath).exists();
      if (exists) {
        valid++;
      } else {
        invalid++;
        invalidRows.push({ docId: d.id, itemId, imageUrl, storagePath });
        if (APPLY) {
          batch.update(d.ref, { imageUrl: "" });
          batchOps++;
        }
      }
    }

    if (APPLY && batchOps >= BATCH_SIZE) {
      await batch.commit();
      updated += batchOps;
      batch = db.batch();
      batchOps = 0;
    }
  }

  if (APPLY && batchOps > 0) {
    await batch.commit();
    updated += batchOps;
  }

  console.log(`   ✓  Scanned item docs: ${scanned}`);
  console.log(`   ✓  Empty imageUrl: ${skippedEmpty}`);
  console.log(`   ✓  Non-Firebase URLs skipped: ${skippedNonStorage}`);
  console.log(`   ✓  Valid Firebase URLs: ${valid}`);
  console.log(`   ✓  Invalid Firebase URLs: ${invalid}`);
  if (APPLY) {
    console.log(`   ✓  Cleared imageUrl on docs: ${updated}`);
  }

  if (invalidRows.length > 0) {
    console.log("\n⚠️  Invalid URLs found (showing first 40):");
    for (const row of invalidRows.slice(0, 40)) {
      console.log(
        `   - itemId=${row.itemId} docId=${row.docId} path=${row.storagePath}`
      );
    }
    if (invalidRows.length > 40) {
      console.log(`   ... and ${invalidRows.length - 40} more`);
    }
  }

  console.log(
    `\n✅  ${APPLY ? "Repair write completed." : "Dry run completed. Re-run with --apply to write changes."}\n`
  );
}

main().catch((err) => {
  console.error("\n❌  Repair script failed:", err, "\n");
  process.exit(1);
});
