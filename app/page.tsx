"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/ui/animated-hero";
import { BrowseShell } from "@/components/browse/BrowseShell";

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        searchOpen={searchOpen}
        onSearchOpenChange={setSearchOpen}
      />
      <Hero />
      <main id="browse" className="flex-1">
        <BrowseShell />
      </main>
      <Footer />
    </div>
  );
}
