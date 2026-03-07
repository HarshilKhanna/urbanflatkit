"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Check,
  LayoutGrid,
  Armchair,
  LampDesk,
  Flower2,
  Plug,
  Scissors,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { SortOption, SORT_OPTIONS } from "./SortBar";
import { Container } from "@/components/layout/Container";

export const FILTER_CATEGORIES = [
  "Furniture",
  "Lighting",
  "Decor",
  "Appliances",
  "Textiles",
] as const;

export type Category = (typeof FILTER_CATEGORIES)[number];

const CATEGORY_ICONS: Record<Category, LucideIcon> = {
  Furniture: Armchair,
  Lighting: LampDesk,
  Decor: Flower2,
  Appliances: Plug,
  Textiles: Scissors,
};

interface FilterBarProps {
  activeCategories: Category[];
  onCategoriesChange: (cats: Category[]) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
}

/* ─── Desktop chips ─────────────────────────────────────────────────────── */
function DesktopChips({
  activeCategories,
  onCategoriesChange,
}: {
  activeCategories: Category[];
  onCategoriesChange: (cats: Category[]) => void;
}) {
  const isAll = activeCategories.length === 0;

  return (
    <div className="hidden flex-1 items-center gap-0.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex">
      {/* All */}
      <button
        onClick={() => onCategoriesChange([])}
        className={[
          "flex flex-shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-150",
          isAll
            ? "border-neutral-300 bg-white text-neutral-900 shadow-sm"
            : "border-neutral-200 text-neutral-500 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-700",
        ].join(" ")}
      >
        <LayoutGrid className="h-3.5 w-3.5 flex-shrink-0" />
        All
      </button>

      {FILTER_CATEGORIES.map((cat) => {
        const active = !isAll && activeCategories.includes(cat);
        const Icon = CATEGORY_ICONS[cat];
        return (
          <button
            key={cat}
            onClick={() => onCategoriesChange([cat])}
            className={[
              "flex flex-shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-150",
              active
                ? "border-neutral-300 bg-white text-neutral-900 shadow-sm"
                : "border-neutral-200 text-neutral-500 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-700",
            ].join(" ")}
          >
            <Icon className="h-3.5 w-3.5 flex-shrink-0" />
            {cat}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Sort dropdown (shared) ─────────────────────────────────────────────── */
function SortDropdown({
  sort,
  onSortChange,
  label = true,
}: {
  sort: SortOption;
  onSortChange: (v: SortOption) => void;
  label?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selectedLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Featured";

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open]);

  return (
    <div ref={ref} className="relative flex-shrink-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-sm select-none text-neutral-500 transition-colors hover:text-neutral-700"
      >
        {label && <span>Sort by:</span>}
        <span className="font-semibold text-neutral-800">{selectedLabel}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.18 }} className="flex items-center">
          <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-neutral-100 bg-white py-1 shadow-lg"
          >
            {SORT_OPTIONS.map((opt) => {
              const active = sort === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => { onSortChange(opt.value); setOpen(false); }}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-sm text-neutral-700 transition-colors hover:bg-neutral-50"
                >
                  <span className={active ? "font-medium text-neutral-900" : ""}>{opt.label}</span>
                  {active && <Check className="h-3.5 w-3.5 text-neutral-500" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Mobile filter bottom sheet ─────────────────────────────────────────── */
function MobileFilterSheet({
  activeCategories,
  onApply,
  onClose,
}: {
  activeCategories: Category[];
  onApply: (cats: Category[]) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<Category[]>(activeCategories);

  const toggle = (cat: Category) =>
    setDraft((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  /* body scroll lock */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* Escape */
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  const allSelected = draft.length === 0;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        className="w-full rounded-t-2xl bg-white"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 38 }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-neutral-200" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3">
          <span className="text-base font-semibold text-neutral-900">Filter</span>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 hover:bg-neutral-200">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="h-px bg-neutral-100" />

        {/* Category checkboxes */}
        <div className="px-5 py-3">
          {/* All option */}
          <button
            onClick={() => setDraft([])}
            className="flex w-full items-center gap-3 py-3"
          >
            <span className={[
              "flex h-5 w-5 items-center justify-center rounded border transition-colors",
              allSelected ? "border-neutral-900 bg-neutral-900" : "border-neutral-300",
            ].join(" ")}>
              {allSelected && <Check className="h-3 w-3 text-white" />}
            </span>
            <span className="flex items-center gap-2 text-sm font-medium text-neutral-800">
              <LayoutGrid className="h-4 w-4 text-neutral-500" /> All categories
            </span>
          </button>

          {FILTER_CATEGORIES.map((cat) => {
            const checked = draft.includes(cat);
            const Icon = CATEGORY_ICONS[cat];
            return (
              <button
                key={cat}
                onClick={() => toggle(cat)}
                className="flex w-full items-center gap-3 py-3"
              >
                <span className={[
                  "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-colors",
                  checked ? "border-neutral-900 bg-neutral-900" : "border-neutral-300",
                ].join(" ")}>
                  {checked && <Check className="h-3 w-3 text-white" />}
                </span>
                <span className="flex items-center gap-2 text-sm font-medium text-neutral-800">
                  <Icon className="h-4 w-4 text-neutral-500" /> {cat}
                </span>
              </button>
            );
          })}
        </div>

        <div className="h-px bg-neutral-100" />

        {/* Actions */}
        <div className="flex gap-3 px-5 py-4">
          <button
            onClick={() => { onApply([]); onClose(); }}
            className="flex-1 rounded-full border border-neutral-200 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
          >
            Reset
          </button>
          <button
            onClick={() => { onApply(draft); onClose(); }}
            className="flex-1 rounded-full bg-neutral-900 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
          >
            Apply
          </button>
        </div>

        {/* Safe area */}
        <div className="h-safe-bottom pb-4" />
      </motion.div>
    </motion.div>
  );
}

/* ─── FilterBar ──────────────────────────────────────────────────────────── */
export function FilterBar({ activeCategories, onCategoriesChange, sort, onSortChange }: FilterBarProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const activeCount = activeCategories.length;

  return (
    <>
      <div className="bg-[#f5f5f3]">
        <Container>
          <div className="flex items-center py-2">

            {/* Desktop chips */}
            <DesktopChips
              activeCategories={activeCategories}
              onCategoriesChange={onCategoriesChange}
            />

            {/* Mobile buttons */}
            <div className="flex flex-1 items-center gap-2 md:hidden">
              <button
                onClick={() => setFilterOpen(true)}
                className="flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-sm font-medium text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filter
                {activeCount > 0 && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-semibold text-white">
                    {activeCount}
                  </span>
                )}
              </button>
            </div>

            {/* Sort (both) */}
            <SortDropdown sort={sort} onSortChange={onSortChange} />
          </div>
        </Container>
      </div>

      {/* Mobile filter sheet */}
      <AnimatePresence>
        {filterOpen && (
          <MobileFilterSheet
            activeCategories={activeCategories}
            onApply={onCategoriesChange}
            onClose={() => setFilterOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export { FILTER_CATEGORIES as CATEGORIES };
