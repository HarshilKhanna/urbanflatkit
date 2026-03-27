/**
 * scripts/migrate-items-to-project1.ts
 *
 * Force-assign all items to Project 1.
 * Use this when old/wrong projectId values (e.g. project-3) leaked into items.
 *
 * Run from project root:
 *   npm run migrate:items-to-project1
 */

import * as admin from "firebase-admin";
import { readFileSync } from "fs";
import { resolve } from "path";

const TARGET_PROJECT_ID = "proj-1";
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

async function main() {
  console.log(`\n🔄  Reassigning all items to projectId="${TARGET_PROJECT_ID}"...\n`);

  const snap = await db.collection("items").get();
  const docs = snap.docs;
  const BATCH_SIZE = 400;
  let updated = 0;

  for (let i = 0; i < docs.length; i += BATCH_SIZE) {
    const batch = db.batch();
    const chunk = docs.slice(i, i + BATCH_SIZE);

    for (const d of chunk) {
      const data = d.data() as { projectId?: unknown };
      if (data.projectId === TARGET_PROJECT_ID) continue;
      batch.update(d.ref, { projectId: TARGET_PROJECT_ID });
      updated++;
    }

    await batch.commit();
  }

  console.log(`   ✓  Scanned ${docs.length} item docs`);
  console.log(`   ✓  Reassigned ${updated} docs to ${TARGET_PROJECT_ID}`);
  console.log("\n✅  Item project reassignment complete.\n");
}

main().catch((err) => {
  console.error("\n❌  Item project reassignment failed:", err, "\n");
  process.exit(1);
});

