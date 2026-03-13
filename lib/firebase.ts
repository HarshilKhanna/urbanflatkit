/**
 * Firebase client SDK — initialised once, re-used everywhere.
 *
 * Firestore data structure
 * ────────────────────────
 * Collection : items
 * Document ID: item.id  (kebab-case string, e.g. "grey-shagreen-console")
 * Fields     : name, brand, category, imageUrl, externalUrl,
 *              specs (map), cardSpecKeys (array), displayPosition (number | null)
 *
 * There are NO subcollections.  Items are stored flat — no tower/flat/room nesting.
 *
 * ⚠️  SECURITY — before production:
 *   • Firestore rules: restrict writes to authenticated admins only.
 *   • Storage rules  : restrict writes to authenticated admins only.
 *   • CORS (cors.json): replace origin "*" with your production domain.
 */

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// Prevent re-initialisation in Next.js (module can be evaluated multiple times).
// The log is inside the same guard so it fires exactly once — on first init only.
const isFirstInit = getApps().length === 0;
const app: FirebaseApp = isFirstInit ? initializeApp(firebaseConfig) : getApp();

const db: Firestore            = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

// TODO: remove this log once Firebase connection is confirmed working
if (isFirstInit && typeof window !== "undefined") {
  console.log("Firebase initialized successfully");
}

export { app, db, storage };
