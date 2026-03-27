import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * Cap reads so the admin dashboard stays fast as the collection grows.
 * Firestore rejects `limit()` above 10_000 per query (hard server max).
 */
const MAX_EVENTS_FOR_DASHBOARD = 10_000;

export interface AnalyticsEvent {
  id: string;
  projectId: string;
  type: string;
  payload: Record<string, string>;
  timestamp: { seconds: number; nanoseconds: number } | null;
}

const COL = "analytics";

/**
 * Fire-and-forget analytics write. Never throws or blocks the UI.
 */
export function trackEvent(
  projectId: string,
  type: string,
  payload: Record<string, string>
): void {
  addDoc(collection(db, COL), {
    projectId,
    type,
    payload,
    timestamp: serverTimestamp(),
  }).catch((err) => {
    console.debug("[analytics] write failed:", err);
  });
}

/**
 * Fetch all analytics events for the admin panel.
 * Returns documents sorted newest-first.
 */
export async function getAllEvents(projectId: string): Promise<AnalyticsEvent[]> {
  const { getDocs, query, where, limit } = await import("firebase/firestore");
  const snap = await getDocs(
    query(
      collection(db, COL),
      where("projectId", "==", projectId),
      limit(MAX_EVENTS_FOR_DASHBOARD),
    ),
  );
  const rows = snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<AnalyticsEvent, "id">),
  }));
  // Sort client-side to avoid requiring a composite index for (projectId + timestamp).
  return rows.sort((a, b) => (b.timestamp?.seconds ?? 0) - (a.timestamp?.seconds ?? 0));
}
