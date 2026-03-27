/**
 * scripts/migrate-analytics-projectId.ts
 *
 * Backfills legacy analytics events that were written before project scoping.
 * Adds `projectId` to docs where it is missing/null/empty.
 *
 * Run from project root:
 *   npm run migrate:analytics-projectid
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

async function resolveActiveProjectId(): Promise<string> {
  const activeSnap = await db
    .collection("projects")
    .where("isActive", "==", true)
    .limit(1)
    .get();

  if (!activeSnap.empty) {
    const data = activeSnap.docs[0].data() as { id?: string };
    if (data.id && data.id.trim()) return data.id;
    return activeSnap.docs[0].id;
  }
  return "proj-1";
}

async function main() {
  const projectId = await resolveActiveProjectId();
  console.log(`\n🔄  Backfilling analytics to projectId="${projectId}"...\n`);

  const snap = await db.collection("analytics").get();
  const docs = snap.docs;
  const BATCH_SIZE = 400;
  let updated = 0;

  for (let i = 0; i < docs.length; i += BATCH_SIZE) {
    const batch = db.batch();
    const chunk = docs.slice(i, i + BATCH_SIZE);

    for (const d of chunk) {
      const data = d.data() as { projectId?: unknown };
      const missingProjectId =
        !Object.prototype.hasOwnProperty.call(data, "projectId") ||
        data.projectId === undefined ||
        data.projectId === null ||
        (typeof data.projectId === "string" && data.projectId.trim() === "");

      if (!missingProjectId) continue;
      batch.update(d.ref, { projectId });
      updated++;
    }

    await batch.commit();
  }

  console.log(`   ✓  Scanned ${docs.length} analytics docs`);
  console.log(`   ✓  Backfilled ${updated} docs`);
  console.log("\n✅  Analytics backfill complete.\n");
}

main().catch((err) => {
  console.error("\n❌  Analytics backfill failed:", err, "\n");
  process.exit(1);
});

