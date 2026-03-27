"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { useProject } from "@/context/ProjectContext";
import {
  createProject,
  getProjectBySlug,
} from "@/lib/firestore";
import type { Project } from "@/types";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function NewProjectPage() {
  const router = useRouter();
  const { refreshProjects } = useProject();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [nameTouched, setNameTouched] = useState(false);
  const computedSlug = useMemo(() => slugify(name), [name]);

  const labelCls =
    "mb-1 block text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400";
  const inputCls =
    "w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none transition-colors focus:border-neutral-400 focus:bg-white";

  const onNameChange = (value: string) => {
    setName(value);
    setSlugError(null);
  };

  const validate = (): string | null => {
    if (!name.trim()) return "Project name is required.";
    if (!computedSlug) return "Project name must include letters or numbers.";

    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSlugError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const normalizedSlug = computedSlug;
    const existing = await getProjectBySlug(normalizedSlug);
    if (existing) {
      setSlugError("This slug is already taken.");
      return;
    }

    const payload: Omit<Project, "createdAt" | "adminUsername" | "adminPassword" | "isActive"> = {
      id: normalizedSlug,
      name: name.trim(),
      slug: normalizedSlug,
      description: description.trim() || undefined,
    };

    setSubmitting(true);
    try {
      await createProject(payload);

      refreshProjects();
      router.push("/admin/projects");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project.");
    } finally {
      setSubmitting(false);
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

      <div className="mb-6">
        <h1 className="text-base font-medium text-neutral-900">New Project</h1>
        <p className="mt-0.5 text-xs font-light text-neutral-400">
          Create a new catalogue project and configure initial setup.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelCls}>Project Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            onBlur={() => setNameTouched(true)}
            placeholder="Project name"
            className={inputCls}
          />
          {nameTouched && !name.trim() && (
            <p className="mt-1 text-[11px] text-red-500">Project name is required.</p>
          )}
          <p className="mt-1 text-[11px] text-neutral-400">
            Project URL will be generated automatically: /{computedSlug || "[slug]"}
          </p>
          {slugError && <p className="mt-1 text-[11px] text-red-500">{slugError}</p>}
        </div>

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

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Creating..." : "Create project"}
          </button>
          <Link
            href="/admin/projects"
            className="text-sm text-neutral-500 transition-colors hover:text-neutral-700"
          >
            Cancel
          </Link>
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}
      </form>
    </AdminShell>
  );
}
