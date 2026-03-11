"use client";

import Link from "next/link";
import { Search, User } from "lucide-react";
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

        {/* Mobile: search + admin icons (right) */}
        <div className="flex flex-shrink-0 items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => onSearchOpenChange?.(true)}
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 shadow-sm transition-colors hover:border-neutral-300 hover:bg-neutral-50"
          >
            <Search className="h-4 w-4" />
          </button>
          <Link
            href="/admin"
            aria-label="Admin"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 shadow-sm transition-colors hover:border-neutral-300 hover:bg-neutral-50"
          >
            <User className="h-4 w-4" />
          </Link>
        </div>

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

        {/* Right: admin button so center bar stays centered (desktop only) */}
        <div className="hidden min-w-0 flex-1 items-center justify-end md:flex">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-600 shadow-sm transition-colors hover:border-neutral-300 hover:bg-neutral-50"
          >
            <User className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">Admin</span>
          </Link>
        </div>

        <SearchTrigger
          open={searchOpen}
          onOpenChange={onSearchOpenChange}
          hideButton
        />
      </Container>
    </header>
  );
}
