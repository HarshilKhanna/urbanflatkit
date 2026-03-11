"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Item } from "@/types";

interface ItemCardProps {
  item: Item;
  onClick?: () => void;
}

export function ItemCard({ item, onClick }: ItemCardProps) {
  const specs = item.specs || {};
  const category = item.category?.toLowerCase() || "";

  const [hoverEnabled, setHoverEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setHoverEnabled(mq.matches);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  let meta: string | undefined;

  if (category === "furniture" || category === "appliances") {
    meta = specs.Dimensions;
  } else if (category === "textiles") {
    meta = specs.Fabric || specs.Material;
  }

  return (
    <motion.div
      onClick={onClick}
      whileHover={hoverEnabled ? { scale: 1.02 } : undefined}
      whileTap={hoverEnabled ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="group cursor-pointer h-64 sm:h-64 md:h-72 xl:h-72"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-[--border] bg-[--tile]">

        {/* Image — square, fills available width */}
        <div className="relative aspect-square w-full flex-shrink-0">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-2"
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
        </div>

        {/* Meta */}
        <div className="flex flex-1 flex-col gap-1 px-3 py-1.5">
          <div className="space-y-0.5">
            {/* Line 1: item name */}
            <p className="truncate text-xs md:text-sm font-semibold text-[--text-primary]">
              {item.name}
            </p>

            {/* Line 2: brand + compact metadata (if any) */}
            <p className="line-clamp-2 text-[11px] md:text-xs text-[--text-secondary]">
              {[item.brand, meta].filter(Boolean).join(" · ")}
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
