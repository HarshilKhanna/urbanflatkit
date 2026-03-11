"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Item } from "@/types";
import { ItemCard } from "./ItemCard";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055, delayChildren: 0.05 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

interface ItemGridProps {
  items: Item[];
  onItemClick: (item: Item) => void;
  animationKey: string;
}

export function ItemGrid({ items, onItemClick, animationKey }: ItemGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-neutral-400">No items in this category.</p>
      </div>
    );
  }

  return (
    <motion.div
      key={animationKey}
      className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2 md:grid-cols-4 md:gap-2.5 xl:grid-cols-6 xl:gap-3"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {items.map((item) => (
          <motion.div key={item.id} variants={cardVariant} layout className="h-full">
            <ItemCard item={item} onClick={() => onItemClick(item)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
