"use client";

import { useMemo, useState, useCallback } from "react";
import { useData } from "@/context/DataContext";
import { Item } from "@/types";
import { ItemGrid } from "./ItemGrid";
import { ItemModal } from "./ItemModal";
import { FilterBar, Category } from "./FilterBar";
import { SortOption } from "./SortBar";

function flattenItems(tower: ReturnType<typeof useData>["data"]): Item[] {
  return tower.flats.flatMap((flat) =>
    flat.rooms.flatMap((room) => room.items)
  );
}

function sortItems(items: Item[], sort: SortOption): Item[] {
  const sorted = [...items];
  switch (sort) {
    case "name-asc":  return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc": return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "brand":     return sorted.sort((a, b) => a.brand.localeCompare(b.brand));
    case "category":  return sorted.sort((a, b) => a.category.localeCompare(b.category));
    default:          return sorted;
  }
}

export function BrowseShell() {
  const { data } = useData();

  // Empty array = all categories visible
  const [activeCategories, setActiveCategories] = useState<Category[]>([]);
  const [activeSort, setActiveSort] = useState<SortOption>("featured");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const closeModal = useCallback(() => setSelectedItem(null), []);

  const allItems = useMemo(() => flattenItems(data), [data]);

  const visibleItems = useMemo(() => {
    const filtered =
      activeCategories.length === 0
        ? allItems
        : allItems.filter((item) =>
            activeCategories.some(
              (cat) => cat.toLowerCase() === item.category.toLowerCase()
            )
          );
    return sortItems(filtered, activeSort);
  }, [allItems, activeCategories, activeSort]);

  const animationKey = `${activeCategories.sort().join(",")}-${activeSort}`;

  return (
    <>
      <FilterBar
        activeCategories={activeCategories}
        onCategoriesChange={setActiveCategories}
        sort={activeSort}
        onSortChange={setActiveSort}
      />

      <section className="mx-auto max-w-[1400px] px-4 pt-8 pb-20">
        <ItemGrid
          items={visibleItems}
          onItemClick={setSelectedItem}
          animationKey={animationKey}
        />
      </section>

      <ItemModal
        item={selectedItem}
        onClose={closeModal}
        onSelectItem={setSelectedItem}
      />
    </>
  );
}
