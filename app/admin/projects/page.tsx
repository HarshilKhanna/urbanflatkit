"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { useProject } from "@/context/ProjectContext";
import { getAllItems } from "@/lib/firestore";
import type { Project } from "@/types";

function activeBadgeClass(isActive: boolean): string {
  if (isActive) {
    return "bg-neutral-900 text-white border border-neutral-900";
  }
  return "bg-neutral-200 text-neutral-700 border border-neutral-200";
}

export default function ProjectsPage() {
  const router = useRouter();
  const { projects, activeProject, setActiveProject, loading } = useProject();
  const [pendingActiveId, setPendingActiveId] = useState<string | null>(null);
  const [itemCounts, setItemCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    getAllItems()
      .then((items) => {
        const counts: Record<string, number> = {};
        for (const item of items) {
          const pid = item.projectId;
          if (!pid) continue;
          counts[pid] = (counts[pid] ?? 0) + 1;
        }
        setItemCounts(counts);
      })
      .catch(() => setItemCounts({}));
  }, [projects]);

  const hasProjects = projects.length > 0;
  const sortedProjects = useMemo(() => [...projects], [projects]);

  const getActivationLabel = (project: Project): string =>
    project.isActive ? "Active" : "Set as active";

  const handleSetActive = async (project: Project) => {
    if (project.isActive) return;
    setPendingActiveId(project.id);
    try {
      await setActiveProject(project);
    } finally {
      setPendingActiveId(null);
    }
  };

  return (
    <AdminShell>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-base font-medium text-neutral-900">Projects</h1>
          <p className="mt-0.5 text-xs font-light text-neutral-400">
            Manage and switch between your catalogue projects.
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.push("/admin/projects/new")}
          className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 sm:min-h-0 sm:py-1.5"
        >
          New Project
        </button>
      </div>

      {loading ? (
        <p className="py-20 text-center text-sm text-neutral-400">Loading projects…</p>
      ) : !hasProjects ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-white px-6 text-center">
          <p className="text-sm font-medium text-neutral-700">No projects yet</p>
          <p className="mt-1 text-xs text-neutral-400">
            Create your first project to start organizing catalogue data.
          </p>
          <button
            type="button"
            onClick={() => router.push("/admin/projects/new")}
            className="mt-5 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
          >
            Create your first project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {sortedProjects.map((project) => {
            const isActive = activeProject?.id === project.id;
            const statusBusy = pendingActiveId === project.id;
            const statusDisabled = project.isActive || statusBusy;
            return (
              <article
                key={project.id}
                className={`rounded-lg border bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${
                  isActive
                    ? "border-l-4 border-l-black border-y-neutral-200 border-r-neutral-200"
                    : "border-neutral-200"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold tracking-tight text-neutral-900">
                      {project.name}
                    </h2>
                    <p className="mt-1 truncate text-xs text-neutral-400">/{project.slug}</p>
                    <p className="mt-1 text-xs text-neutral-400">
                      {itemCounts[project.id] ?? 0} items
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${activeBadgeClass(project.isActive)}`}
                  >
                    {project.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => handleSetActive(project)}
                    disabled={statusDisabled}
                    className="rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {statusBusy ? "Updating..." : getActivationLabel(project)}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push(`/admin/projects/${project.id}/settings`)}
                    className="rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                  >
                    Settings
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </AdminShell>
  );
}
