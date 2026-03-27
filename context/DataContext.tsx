"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { Item, Tower } from "@/types";
import { DEFAULT_DATA } from "@/data/defaultData";
import {
  subscribeAllItems,
  subscribeProjectItems,
  addItem as fsAdd,
  updateItem as fsUpdate,
  deleteItem as fsDelete,
} from "@/lib/firestore";
import { ProjectContext } from "@/context/ProjectContext";

interface DataContextValue {
  data: Tower;
  /** True while the initial Firestore fetch is in flight */
  loading: boolean;
  addItem: (item: Item) => void;
  updateItem: (id: string, patch: Partial<Item>) => void;
  deleteItem: (id: string) => void;
}

const DataContext = createContext<DataContextValue | null>(null);

/** Wrap a flat Item[] into the Tower shape that all existing components expect. */
function toTower(items: Item[]): Tower {
  return { flats: [{ rooms: [{ items }] }] };
}

/** Pull every item out of the nested Tower into a flat array. */
function flattenTower(tower: Tower): Item[] {
  return tower.flats.flatMap((f) => f.rooms.flatMap((r) => r.items));
}

export function DataProvider({ children }: { children: ReactNode }) {
  const projectCtx = useContext(ProjectContext);
  const activeProject = projectCtx?.activeProject ?? null;
  const isAdminScoped = Boolean(projectCtx);

  // Public app starts with bundled defaults; admin starts blank to avoid cross-project flicker.
  const [data, setData] = useState<Tower>(() => (isAdminScoped ? toTower([]) : DEFAULT_DATA));
  const [loading, setLoading] = useState<boolean>(isAdminScoped);

  useEffect(() => {
    // Public app (no ProjectProvider): keep current unscoped behavior.
    if (!projectCtx) {
      setLoading(true);
      const unsubscribe = subscribeAllItems(
        (items) => {
          if (items.length > 0) {
            setData(toTower(items));
          }
          // If collection is empty (not yet migrated) keep DEFAULT_DATA visible
          setLoading(false);
        },
        (err) => {
          console.error("Firestore subscribe failed — showing local data:", err);
          setLoading(false);
        }
      );
      return unsubscribe;
    }

    // Admin app (with ProjectProvider): do not fetch until a project is selected.
    if (!activeProject) {
      // Wait until ProjectContext resolves active project before showing data.
      if (projectCtx.loading) {
        setLoading(true);
        return;
      }
      setData(toTower([]));
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeProjectItems(
      activeProject.id,
      (items) => {
        if (items.length > 0) {
          setData(toTower(items));
        } else {
          setData(toTower([]));
        }
        setLoading(false);
      },
      (err) => {
        console.error("Firestore subscribe failed — showing local data:", err);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [projectCtx, activeProject, projectCtx?.loading]);

  // ─── Mutations — optimistic local update then async Firestore sync ───────

  const addItem: DataContextValue["addItem"] = (item) => {
    setData((prev) => toTower([...flattenTower(prev), item]));
    fsAdd(item).catch((err) =>
      console.error("Firestore addItem failed:", err)
    );
  };

  const updateItem: DataContextValue["updateItem"] = (id, patch) => {
    setData((prev) =>
      toTower(
        flattenTower(prev).map((item) =>
          item.id === id ? { ...item, ...patch } : item
        )
      )
    );
    fsUpdate(id, patch).catch((err) =>
      console.error("Firestore updateItem failed:", err)
    );
  };

  const deleteItem: DataContextValue["deleteItem"] = (id) => {
    setData((prev) =>
      toTower(flattenTower(prev).filter((item) => item.id !== id))
    );
    fsDelete(id).catch((err) =>
      console.error("Firestore deleteItem failed:", err)
    );
  };

  return (
    <DataContext.Provider value={{ data, loading, addItem, updateItem, deleteItem }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside <DataProvider>");
  return ctx;
}
