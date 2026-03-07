"use client";

import { Search } from "lucide-react";
import { Container } from "./Container";
import { SearchTrigger } from "./SearchTrigger";

interface NavbarProps {
  searchOpen?: boolean;
  onSearchOpenChange?: (open: boolean) => void;
}

export function Navbar({ searchOpen, onSearchOpenChange }: NavbarProps) {
  return (
    <header className="bg-[#f5f5f3]">
      <Container className="flex items-center py-4">
        {/* Left: title */}
        <div className="flex flex-1 items-center justify-start min-w-0">
          <span className="font-semibold text-base tracking-tight text-neutral-900">
            UrbanFlatKit
          </span>
        </div>

        {/* Mobile: search icon only (right) */}
        <button
          type="button"
          onClick={() => onSearchOpenChange?.(true)}
          aria-label="Search"
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 shadow-sm transition-colors hover:border-neutral-300 hover:bg-neutral-50 md:hidden"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Desktop: center search bar — same width as hero content (max-w-2xl) */}
        <div className="hidden w-full max-w-2xl flex-shrink-0 justify-center px-4 md:flex">
          <button
            type="button"
            onClick={() => onSearchOpenChange?.(true)}
            className="flex w-full items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-left text-sm text-neutral-500 shadow-sm transition-colors hover:border-neutral-300 hover:bg-neutral-50/80"
          >
            <Search className="h-4 w-4 flex-shrink-0 text-neutral-400" />
            <span className="truncate">
              Search items, brands, and categories…
            </span>
          </button>
        </div>

        {/* Right: spacer so center bar is truly centered (desktop only) */}
        <div className="hidden flex-1 min-w-0 md:block" aria-hidden />

        <SearchTrigger
          open={searchOpen}
          onOpenChange={onSearchOpenChange}
          hideButton
        />
      </Container>
    </header>
  );
}
