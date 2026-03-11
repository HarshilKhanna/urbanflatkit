"use client";

import { useMemo, useState } from "react";
import { useData } from "@/context/DataContext";
import { Item } from "@/types";
import { ItemGrid } from "./ItemGrid";
import { FilterBar, Category } from "./FilterBar";
import { SortOption } from "./SortBar";
import {
  useAccommodation,
  ACCOMMODATION_OPTIONS,
  AccommodationType,
} from "@/context/AccommodationContext";

function flattenItems(tower: ReturnType<typeof useData>["data"]): Item[] {
  return tower.flats.flatMap((flat) =>
    flat.rooms.flatMap((room) => room.items)
  );
}

const CATEGORY_ORDER: Record<string, number> = {
  furniture: 0,
  lighting: 1,
  decor: 2,
  textiles: 3,
  appliances: 4,
};

function primaryDimension(item: Item): number {
  const dim = item.specs?.Dimensions;
  if (!dim) return 0;
  const nums = dim.match(/[\d.]+/g);
  if (!nums || nums.length === 0) return 0;
  return Math.max(...nums.map(Number));
}

function featuredSort(items: Item[]): Item[] {
  return [...items].sort((a, b) => {
    const catA = CATEGORY_ORDER[a.category.toLowerCase()] ?? 99;
    const catB = CATEGORY_ORDER[b.category.toLowerCase()] ?? 99;
    if (catA !== catB) return catA - catB;
    return primaryDimension(b) - primaryDimension(a);
  });
}

function sortItems(items: Item[], sort: SortOption): Item[] {
  switch (sort) {
    case "name-asc":
      return [...items].sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return [...items].sort((a, b) => b.name.localeCompare(a.name));
    case "brand":
      return [...items].sort((a, b) => a.brand.localeCompare(b.brand));
    case "category":
      return featuredSort(items);
    default:
      return featuredSort(items);
  }
}

export function BrowseShell() {
  const { data } = useData();
  const {
    promptNeeded,
    showPrompt,
    openPrompt,
    select,
    fitsAccommodation,
  } = useAccommodation();

  const [activeCategories, setActiveCategories] = useState<Category[]>([]);
  const [activeSort, setActiveSort] = useState<SortOption>("featured");

  const allItems = useMemo(() => flattenItems(data), [data]);

  const visibleItems = useMemo(() => {
    const filtered =
      activeCategories.length === 0
        ? allItems
        : allItems.filter((item) =>
            activeCategories.some(
              (cat) => cat.toLowerCase() === item.category.toLowerCase(),
            ),
          );

    const accommodationFiltered = filtered.filter(fitsAccommodation);
    return sortItems(accommodationFiltered, activeSort);
  }, [allItems, activeCategories, activeSort, fitsAccommodation]);

  const animationKey = `${activeCategories.sort().join(",")}-${activeSort}`;

  const handleItemClick = (item: Item) => {
    const hasDimensions = Boolean(item.specs?.Dimensions);

    if (hasDimensions && promptNeeded) {
      openPrompt();
      return;
    }

    if (item.externalUrl && typeof window !== "undefined") {
      window.open(item.externalUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <FilterBar
        activeCategories={activeCategories}
        onCategoriesChange={setActiveCategories}
        sort={activeSort}
        onSortChange={setActiveSort}
      />

      <section className="mx-auto max-w-[1400px] px-4 pt-4 pb-20">
        <ItemGrid
          items={visibleItems}
          onItemClick={handleItemClick}
          animationKey={animationKey}
        />
      </section>

      {showPrompt && <AccommodationPrompt onSelect={select} />}
    </>
  );
}

function AccommodationPrompt({
  onSelect,
}: {
  onSelect: (value: AccommodationType) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div
        className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-1 text-sm font-semibold text-neutral-900">
          What type of home are you shopping for?
        </h2>
        <p className="mb-4 text-xs text-neutral-500">
          We&rsquo;ll show you items that fit your space.
        </p>

        <div className="max-h-64 overflow-y-auto rounded-lg border border-neutral-200">
          {ACCOMMODATION_OPTIONS.map((opt, i) => (
            <button
              key={opt}
              type="button"
              onClick={() => onSelect(opt)}
              className={`flex w-full items-center px-3 py-2.5 text-left text-xs text-neutral-700 transition-colors hover:bg-neutral-50 ${
                i !== ACCOMMODATION_OPTIONS.length - 1
                  ? "border-b border-neutral-100"
                  : ""
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
