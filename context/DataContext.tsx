"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Tower } from "@/types";
import { DEFAULT_DATA } from "@/data/defaultData";

const STORAGE_KEY = "urbanflatkit_data";

interface DataContextValue {
  data: Tower;
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

  useEffect(() => {
    setData(loadData());
  }, []);

  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
}

export function useData(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside <DataProvider>");
  return ctx;
}
