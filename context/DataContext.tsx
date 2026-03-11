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

const STORAGE_KEY = "urbanflatkit_data";

interface DataContextValue {
  data: Tower;
  addItem: (item: Item) => void;
  updateItem: (id: string, patch: Partial<Item>) => void;
  deleteItem: (id: string) => void;
}

const DataContext = createContext<DataContextValue | null>(null);

function loadData(): Tower {
  if (typeof window === "undefined") return DEFAULT_DATA;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as Tower;
  } catch {
    // corrupt storage – fall through to default
  }
  return DEFAULT_DATA;
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Tower>(DEFAULT_DATA);

  const persist = (value: Tower) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      // ignore write errors
    }
  };

  const addItem: DataContextValue["addItem"] = (item) => {
    setData((prev) => {
      // Create a deep-ish copy so we don't mutate existing state
      const next: Tower = {
        flats: prev.flats.map((flat) => ({
          rooms: flat.rooms.map((room) => ({
            items: [...room.items],
          })),
        })),
      };

      if (!next.flats.length) {
        next.flats = [{ rooms: [{ items: [item] }] }];
      } else if (!next.flats[0].rooms.length) {
        next.flats[0].rooms = [{ items: [item] }];
      } else {
        next.flats[0].rooms[0].items.push(item);
      }

      persist(next);
      return next;
    });
  };

  const updateItem: DataContextValue["updateItem"] = (id, patch) => {
    setData((prev) => {
      let changed = false;
      const next: Tower = {
        flats: prev.flats.map((flat) => ({
          rooms: flat.rooms.map((room) => ({
            items: room.items.map((existing) => {
              if (existing.id !== id) return existing;
              changed = true;
              return { ...existing, ...patch };
            }),
          })),
        })),
      };
      if (changed) persist(next);
      return changed ? next : prev;
    });
  };

  const deleteItem: DataContextValue["deleteItem"] = (id) => {
    setData((prev) => {
      let changed = false;
      const next: Tower = {
        flats: prev.flats.map((flat) => ({
          rooms: flat.rooms.map((room) => {
            const items = room.items.filter((item) => item.id !== id);
            if (items.length !== room.items.length) changed = true;
            return { items };
          }),
        })),
      };
      if (changed) persist(next);
      return changed ? next : prev;
    });
  };

  useEffect(() => {
    const loaded = loadData();
    setData(loaded);
  }, []);

  return (
    <DataContext.Provider value={{ data, addItem, updateItem, deleteItem }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside <DataProvider>");
  return ctx;
}
