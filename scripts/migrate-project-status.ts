/**
 * scripts/migrate-project-status.ts
 *
 * Migrates legacy `status` based project activity to boolean `isActive`
 * and guarantees only one project is active.
 *
 * Run from project root:
 *   npm run migrate:project-status
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

async function main() {
  console.log("\n🔄  Migrating project activity state...\n");
  const snap = await db.collection("projects").get();
  const docs = snap.docs;
  const BATCH_SIZE = 400;
  let updated = 0;
  let chosenActiveId: string | null = null;

  for (const d of docs) {
    const data = d.data() as { isActive?: unknown; status?: unknown };
    if (data.isActive === true && !chosenActiveId) {
      chosenActiveId = d.id;
      break;
    }
  }
  if (!chosenActiveId) {
    for (const d of docs) {
      const status = String((d.data() as { status?: unknown }).status ?? "").toLowerCase();
      if (status === "active") {
        chosenActiveId = d.id;
        break;
      }
    }
  }
  if (!chosenActiveId && docs[0]) {
    chosenActiveId = docs[0].id;
  }

  for (let i = 0; i < docs.length; i += BATCH_SIZE) {
    const batch = db.batch();
    const chunk = docs.slice(i, i + BATCH_SIZE);

    for (const d of chunk) {
      const nextIsActive = d.id === chosenActiveId;
      batch.update(d.ref, { isActive: nextIsActive });
      updated++;
    }
    await batch.commit();
  }

  console.log(`   ✓  Scanned ${docs.length} projects`);
  console.log(`   ✓  Set isActive on ${updated} projects`);
  console.log(`   ✓  Active project: ${chosenActiveId ?? "none"}`);
  console.log("\n✅  Project activity migration complete.\n");
}

main().catch((err) => {
  console.error("\n❌  Project status migration failed:", err, "\n");
  process.exit(1);
});

