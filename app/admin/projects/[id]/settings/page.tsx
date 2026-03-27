"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { useProject } from "@/context/ProjectContext";
import {
  deleteProject,
  getProject,
  getProjectBySlug,
  updateProject,
} from "@/lib/firestore";
import type { Project } from "@/types";

export default function ProjectSettingsPage() {
  const params = useParams<{ id: string }>();
  const projectId = params.id;
  const router = useRouter();
  const {
    projects,
    activeProject,
    setActiveProject,
    patchProjectOptimistic,
    refreshProjects,
  } = useProject();

  const existing = useMemo(
    () => projects.find((p) => p.id === projectId) ?? null,
    [projects, projectId],
  );

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dangerLoading, setDangerLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [slugError, setSlugError] = useState<string | null>(null);

  const labelCls =
    "mb-1 block text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400";
  const inputCls =
    "w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none transition-colors focus:border-neutral-400 focus:bg-white";

  const slugify = (input: string): string =>
    input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  useEffect(() => {
    let alive = true;
    const hydrate = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const base = existing ?? (await getProject(projectId));
        if (!alive) return;
        if (!base) {
          setNotFound(true);
          return;
        }
        setName(base.name);
        setSlug(base.slug);
        setDescription(base.description ?? "");
        setIsActive(Boolean(base.isActive));
      } catch (e) {
        if (!alive) return;
        setError(e instanceof Error ? e.message : "Failed to load project.");
      } finally {
        if (alive) setLoading(false);
      }
    };
    void hydrate();
    return () => {
      alive = false;
    };
  }, [existing, projectId]);

  const validate = (): string | null => {
    if (!name.trim()) return "Project name is required.";
    return null;
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSlugError(null);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const nextSlug = slugify(name.trim());
    if (!nextSlug) {
      setSlugError("Project name must include letters or numbers.");
      return;
    }
    if (nextSlug !== slug) {
      const existingSlug = await getProjectBySlug(nextSlug);
      if (existingSlug && existingSlug.id !== projectId) {
        setSlugError("This slug is already taken.");
        return;
      }
    }

    const updates: Partial<Project> = {
      name: name.trim(),
      slug: nextSlug,
      description: description.trim() || undefined,
    };

    const prevActive = activeProject;
    patchProjectOptimistic(projectId, updates);
    if (prevActive?.id === projectId) {
      await setActiveProject({ ...prevActive, ...updates });
    }

    setSaving(true);
    try {
      await updateProject(projectId, updates);
      setSlug(nextSlug);
      refreshProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save project.");
      refreshProjects();
    } finally {
      setSaving(false);
    }
  };

  const handleSetActive = async () => {
    if (isActive) return;
    setError(null);
    patchProjectOptimistic(projectId, { isActive: true });
    setDangerLoading(true);
    try {
      const nextProject: Project = {
        ...(existing ?? {
          id: projectId,
          adminUsername: "admin",
          adminPassword: "admin1234",
          createdAt: new Date(),
        }),
        name: name.trim(),
        slug: slugify(name.trim()) || slug,
        description: description.trim() || undefined,
        isActive: true,
      };
      await setActiveProject(nextProject);
      setIsActive(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to set project active.");
      refreshProjects();
    } finally {
      setDangerLoading(false);
    }
  };

  const canDelete = Boolean(existing && projects.length > 1);
  const deleteConfirmed = deleteConfirm.trim() === name.trim();

  const handleDelete = async () => {
    if (!canDelete || !deleteConfirmed) return;
    setError(null);
    setDangerLoading(true);
    try {
      await deleteProject(projectId);
      refreshProjects();
      router.push("/admin/projects");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project.");
      refreshProjects();
      setDangerLoading(false);
    }
  };

  return (
    <AdminShell>
      <div className="mb-5">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-600"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to projects
        </Link>
      </div>

      {loading ? (
        <p className="py-20 text-center text-sm text-neutral-400">Loading project…</p>
      ) : notFound ? (
        <div className="rounded-lg border border-neutral-200 bg-white px-6 py-8 text-center">
          <p className="text-sm text-neutral-500">Project not found.</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h1 className="text-base font-medium text-neutral-900">Project Settings</h1>
            <p className="mt-0.5 text-xs font-light text-neutral-400">
              Update project configuration.
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className={labelCls}>Project Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Project name"
                className={inputCls}
              />
            </div>

            <p className="text-[11px] text-neutral-400">
              Project URL updates automatically from name: /{slugify(name) || "[slug]"}
            </p>

            <div>
              <label className={labelCls}>Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description"
                className={`${inputCls} resize-none`}
              />
            </div>

            <div>
              <label className={labelCls}>Active State</label>
              <div className="inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[11px] font-medium capitalize text-neutral-700">
                {isActive ? "active" : "inactive"}
              </div>
              <div className="mt-2">
                <button
                  type="button"
                  onClick={handleSetActive}
                  disabled={isActive || dangerLoading}
                  className="rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isActive ? "Active" : "Set as active"}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={saving || dangerLoading}
                className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <Link
                href="/admin/projects"
                className="text-sm text-neutral-500 transition-colors hover:text-neutral-700"
              >
                Cancel
              </Link>
            </div>

            {slugError && <p className="text-xs text-red-500">{slugError}</p>}
            {error && <p className="text-xs text-red-500">{error}</p>}
          </form>

          <section className="mt-8 rounded-lg border border-red-200 p-4">
            <h2 className="text-sm font-semibold text-neutral-900">Danger Zone</h2>
            <p className="mt-1 text-xs text-neutral-500">
              Permanently delete this project.
            </p>

            <div className="mt-4 flex flex-col gap-3">
              <div className="space-y-2">
                <p className="text-xs text-neutral-500">
                  Type <span className="font-medium text-neutral-700">{name || "project name"}</span> to
                  confirm deletion.
                </p>
                <input
                  type="text"
                  value={deleteConfirm}
                  onChange={(e) => setDeleteConfirm(e.target.value)}
                  placeholder="Type project name to confirm"
                  className={inputCls}
                />
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={!canDelete || !deleteConfirmed || dangerLoading}
                  className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Delete project
                </button>
                {!canDelete && (
                  <p className="text-[11px] text-neutral-400">
                    {projects.length <= 1
                      ? "At least one project must always exist."
                      : "Project cannot be deleted."}
                  </p>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </AdminShell>
  );
}
