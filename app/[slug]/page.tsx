"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BrowseShell } from "@/components/browse/BrowseShell";
import { getProjectBySlug } from "@/lib/firestore";
import type { Project } from "@/types";

function UnavailableProject() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7f5] px-4 text-center">
      <p className="text-sm text-neutral-500">This project is not available.</p>
    </div>
  );
}

export default function ProjectBrowsePage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      setLoading(true);
      try {
        const found = await getProjectBySlug(slug);
        if (!alive) return;
        if (!found || !found.isActive) {
          setProject(null);
          setAvailable(false);
          return;
        }
        setProject(found);
        setAvailable(true);
      } catch {
        if (!alive) return;
        setProject(null);
        setAvailable(false);
      } finally {
        if (alive) setLoading(false);
      }
    };
    void load();
    return () => {
      alive = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f5] px-4 text-center">
        <p className="text-sm text-neutral-500">Loading project...</p>
      </div>
    );
  }

  if (!available || !project) return <UnavailableProject />;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar title={project.name} />
      <main id="browse" className="flex-1">
        <BrowseShell projectId={project.id} />
      </main>
      <Footer />
    </div>
  );
}

