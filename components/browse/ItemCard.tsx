"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Item } from "@/types";

interface ItemCardProps {
  item: Item;
  onClick?: () => void;
}

export function ItemCard({ item, onClick }: ItemCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="group h-full cursor-pointer"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[--border] bg-[--tile]">

        {/* Image — square, fills available width */}
        <div className="relative aspect-square w-full flex-shrink-0">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-6"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-neutral-200"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          )}

          {/* Arrow button */}
          {item.externalUrl && (
            <a
              href={item.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.externalLabel || `View ${item.name}`}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-neutral-400 shadow-sm ring-1 ring-[--border] transition-colors duration-150 hover:text-neutral-900"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        {/* Meta — fixed height so every card is identical */}
        <div className="flex h-[62px] flex-shrink-0 flex-col justify-center px-4">
          {(item.brand || item.category) && (
            <p className="truncate text-xs text-[--text-secondary]">
              {[item.brand, item.category].filter(Boolean).join(" · ")}
            </p>
          )}
          <p className="truncate text-sm font-medium text-[--text-primary]">
            {item.name}
          </p>
        </div>

      </div>
    </motion.div>
  );
}
