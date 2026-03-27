/**
 * scripts/migrateProjects.ts
 *
 * Creates a default project document and assigns projectId to existing items
 * where projectId is not already present.
 *
 * Run from the project root:
 *   npm run migrate:projects
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

const PROJECT_DOC_ID = "urban-flat-kit";
const PROJECT_ID = "proj-1";

async function upsertProject(): Promise<void> {
  await db.collection("projects").doc(PROJECT_DOC_ID).set({
    id: "proj-1",
    name: "Project 1",
    slug: "project-1",
    description: "Default furniture catalogue",
    isActive: true,
    adminUsername: "admin",
    adminPassword: "admin1234",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
}

async function backfillItemsProjectId(): Promise<{ scanned: number; updated: number }> {
  const snap = await db.collection("items").get();
  const docs = snap.docs;

  const BATCH_SIZE = 400;
  let updated = 0;

  for (let i = 0; i < docs.length; i += BATCH_SIZE) {
    const batch = db.batch();
    const chunk = docs.slice(i, i + BATCH_SIZE);

    for (const d of chunk) {
      const data = d.data() as { projectId?: unknown };
      const hasProjectId =
        Object.prototype.hasOwnProperty.call(data, "projectId") &&
        data.projectId !== undefined &&
        data.projectId !== null;

      if (hasProjectId) continue;

      batch.update(d.ref, { projectId: PROJECT_ID });
      updated++;
    }

    await batch.commit();
  }

  return { scanned: docs.length, updated };
}

async function main() {
  console.log("\n🔄  Running project migration...\n");

  await upsertProject();
  console.log(`   ✓  Upserted project doc: projects/${PROJECT_DOC_ID}`);

  const { scanned, updated } = await backfillItemsProjectId();
  console.log(`   ✓  Scanned ${scanned} item docs`);
  console.log(`   ✓  Added projectId to ${updated} docs`);

  console.log("\n✅  Project migration complete.\n");
}

main().catch((err) => {
  console.error("\n❌  Project migration failed:", err, "\n");
  process.exit(1);
});
