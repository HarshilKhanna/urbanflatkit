"use client";

import { useEffect, useMemo, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2, Pencil, Plus } from "lucide-react";
import { useData } from "@/context/DataContext";
import type { Item } from "@/types";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

type Category =
  | "Furniture"
  | "Lighting"
  | "Decor"
  | "Appliances"
  | "Textiles"
  | "Other";

const CATEGORY_OPTIONS: Category[] = [
  "Furniture",
  "Lighting",
  "Decor",
  "Appliances",
  "Textiles",
  "Other",
];

const SPEC_OPTIONS: Record<Category, string[]> = {
  Furniture: ["Material", "Dimensions", "Finish", "Designer"],
  Lighting: ["Material", "Bulb", "Diameter", "Height"],
  Decor: ["Material", "Finish", "Size", "Origin"],
  Appliances: ["Capacity", "Power", "Programs", "Energy rating"],
  Textiles: ["Material", "Size", "Care", "Weight"],
  Other: ["Detail 1", "Detail 2", "Detail 3", "Detail 4"],
};

type MetadataRow = {
  keyChoice: string;
  customKey: string;
  value: string;
};

function createIdFromName(name: string): string {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const suffix = Math.random().toString(36).slice(2, 6);
  return base ? `${base}-${suffix}` : `item-${suffix}`;
}

function flattenItems(data: ReturnType<typeof useData>["data"]): Item[] {
  return data.flats.flatMap((flat) =>
    flat.rooms.flatMap((room) => room.items)
  );
}

export default function AdminPage() {
  const { data, addItem, updateItem, deleteItem } = useData();
  const router = useRouter();

  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  const [mode, setMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState<Category>("Furniture");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [externalUrl, setExternalUrl] = useState("");
  const [externalLabel, setExternalLabel] = useState("");
  const [metadataRows, setMetadataRows] = useState<MetadataRow[]>([
    { keyChoice: "", customKey: "", value: "" },
    { keyChoice: "", customKey: "", value: "" },
  ]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("urbanflatkit_admin");
    if (stored === "1") setIsAdmin(true);
  }, []);

  const allItems = useMemo(() => flattenItems(data), [data]);

  const currentSpecOptions = useMemo(
    () => SPEC_OPTIONS[category] ?? SPEC_OPTIONS.Other,
    [category]
  );

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (username === "admin1" && password === "1234") {
      setIsAdmin(true);
      setAuthError(null);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("urbanflatkit_admin", "1");
      }
    } else {
      setAuthError("Invalid credentials");
    }
  };

  const resetForm = () => {
    setMode("add");
    setEditingId(null);
    setName("");
    setBrand("");
    setCategory("Furniture");
    setDescription("");
    setImageUrl("");
    setImageFile(null);
    setExternalUrl("");
    setExternalLabel("");
    setMetadataRows([
      { keyChoice: "", customKey: "", value: "" },
      { keyChoice: "", customKey: "", value: "" },
    ]);
  };

  const handleEdit = (item: Item) => {
    setMode("edit");
    setEditingId(item.id);
    setName(item.name);
    setBrand(item.brand);
    setCategory((item.category as Category) || "Other");
    setDescription(item.description);
    setImageUrl(item.imageUrl);
    setImageFile(null);
    setExternalUrl(item.externalUrl);
    setExternalLabel(item.externalLabel);
    const entries = Object.entries(item.specs || {});
    const rows: MetadataRow[] = entries.slice(0, 4).map(([k, v]) => ({
      keyChoice: k,
      customKey: "",
      value: v,
    }));
    while (rows.length < 2) {
      rows.push({ keyChoice: "", customKey: "", value: "" });
    }
    setMetadataRows(rows);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddMetadataRow = () => {
    if (metadataRows.length >= 4) return;
    setMetadataRows((rows) => [...rows, { keyChoice: "", customKey: "", value: "" }]);
  };

  const handleMetadataChange = (
    index: number,
    patch: Partial<MetadataRow>
  ) => {
    setMetadataRows((rows) =>
      rows.map((row, i) => (i === index ? { ...row, ...patch } : row))
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    if (!name.trim()) {
      setSubmitError("Name is required.");
      return;
    }
    const specsEntries = metadataRows
      .map((row) => {
        const key =
          row.keyChoice === "custom"
            ? row.customKey.trim()
            : row.keyChoice.trim();
        const value = row.value.trim();
        if (!key || !value) return null;
        return [key, value] as const;
      })
      .filter(Boolean) as [string, string][];

    const specs: Item["specs"] = {};
    for (const [k, v] of specsEntries) {
      specs[k] = v;
    }

    let finalImageUrl = imageUrl.trim();

    if (imageFile) {
      try {
        const safeName = name.trim() || imageFile.name || "item-image";
        const storagePath = `items/${Date.now()}-${safeName.replace(
          /[^a-z0-9.\-_]/gi,
          "_"
        )}`;
        const storageRef = ref(storage, storagePath);
        await uploadBytes(storageRef, imageFile);
        finalImageUrl = await getDownloadURL(storageRef);
      } catch (err) {
        console.error(err);
        setSubmitError("Uploading image failed. Please try again.");
        return;
      }
    }

    if (!finalImageUrl) {
      setSubmitError("Please upload an image.");
      return;
    }

    if (mode === "edit" && editingId) {
      updateItem(editingId, {
        name: name.trim(),
        brand: brand.trim(),
        category,
        description: description.trim(),
        imageUrl: finalImageUrl,
        externalUrl: externalUrl.trim(),
        externalLabel: externalLabel.trim() || "View item",
        specs,
      });
      setSubmitSuccess("Item updated.");
    } else {
      const item: Item = {
        id: createIdFromName(name),
        name: name.trim(),
        brand: brand.trim(),
        category,
        description: description.trim(),
        imageUrl: finalImageUrl,
        externalUrl: externalUrl.trim(),
        externalLabel: externalLabel.trim() || "View item",
        specs,
      };
      addItem(item);
      setSubmitSuccess("Item added.");
      resetForm();
    }
  };

  const handleDelete = (id: string) => {
    // simple confirm; this is an internal tool
    if (window.confirm("Remove this item from the catalogue?")) {
      deleteItem(id);
      if (editingId === id) {
        resetForm();
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f3]">
      <Navbar />

      <main className="flex-1 py-6">
        <Container className="space-y-6">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-800"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to browse
          </button>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-neutral-900">
                Admin dashboard
              </h1>
              <p className="mt-1 text-sm text-neutral-500">
                Manage items in UrbanFlatKit. Changes apply only on this device.
              </p>
            </div>
          </div>

          {!isAdmin ? (
            <section className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-neutral-900">
                Admin login
              </h2>
              <p className="mt-1 text-xs text-neutral-500">
                Use your admin credentials to access the dashboard.
              </p>
              <form
                onSubmit={handleLogin}
                className="mt-4 flex flex-col gap-3 max-w-sm"
              >
                <div className="space-y-1">
                  <label className="block text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none ring-0 focus:border-neutral-400 focus:bg-white"
                    placeholder="admin1"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none ring-0 focus:border-neutral-400 focus:bg-white"
                    placeholder="1234"
                  />
                </div>
                {authError && (
                  <p className="text-xs text-red-500">{authError}</p>
                )}
                <button
                  type="submit"
                  className="mt-1 inline-flex items-center justify-center rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
                >
                  Log in
                </button>
              </form>
            </section>
          ) : (
            <>
              <section className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-neutral-900">
                      {mode === "add" ? "Add item" : "Edit item"}
                    </h2>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      Upto four metadata fields, plus description, link, and image.
                    </p>
                  </div>
                  {mode === "edit" && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="inline-flex items-center gap-1 rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600 hover:bg-neutral-50"
                    >
                      <Plus className="h-3 w-3" />
                      New
                    </button>
                  )}
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="block text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                        Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none ring-0 focus:border-neutral-400 focus:bg-white"
                        placeholder="Item name"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                        Brand
                      </label>
                      <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none ring-0 focus:border-neutral-400 focus:bg-white"
                        placeholder="Brand"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) =>
                          setCategory(e.target.value as Category)
                        }
                        className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none ring-0 focus:border-neutral-400 focus:bg-white"
                      >
                        {CATEGORY_OPTIONS.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                        Image upload
                      </label>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setImageFile(file);
                            if (!file) {
                              setImageUrl("");
                              return;
                            }
                            const objectUrl = URL.createObjectURL(file);
                            setImageUrl(objectUrl);
                          }}
                          className="block w-full text-xs text-neutral-700 file:mr-2 file:rounded-full file:border-0 file:bg-neutral-900 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-neutral-700"
                        />
                        {(imageFile || imageUrl) && (
                          <button
                            type="button"
                            onClick={() => {
                              setImageFile(null);
                              setImageUrl("");
                            }}
                            className="self-start text-xs text-neutral-500 hover:text-neutral-800"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                      {imageUrl && (
                        <div className="mt-2 inline-flex items-center gap-2 rounded-lg bg-neutral-50 p-2">
                          <span className="h-10 w-10 overflow-hidden rounded-md bg-neutral-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={imageUrl}
                              alt="Preview"
                              className="h-full w-full object-cover"
                            />
                          </span>
                          <span className="text-[11px] text-neutral-500">
                            Preview of uploaded image
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="w-full resize-none rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none ring-0 focus:border-neutral-400 focus:bg-white"
                      placeholder="A short, curated description"
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="block text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                        Link
                      </label>
                      <input
                        type="url"
                        value={externalUrl}
                        onChange={(e) => setExternalUrl(e.target.value)}
                        className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none ring-0 focus:border-neutral-400 focus:bg-white"
                        placeholder="https://"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                        Link label
                      </label>
                      <input
                        type="text"
                        value={externalLabel}
                        onChange={(e) => setExternalLabel(e.target.value)}
                        className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none ring-0 focus:border-neutral-400 focus:bg-white"
                        placeholder="e.g. via Brand"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
                        Metadata (up to 4)
                      </h3>
                      <button
                        type="button"
                        onClick={handleAddMetadataRow}
                        disabled={metadataRows.length >= 4}
                        className="text-xs font-medium text-neutral-600 disabled:opacity-40"
                      >
                        Add detail
                      </button>
                    </div>

                    <div className="space-y-2">
                      {metadataRows.map((row, index) => (
                        <div
                          key={index}
                          className="grid gap-2 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
                        >
                          <div className="space-y-1">
                            <select
                              value={row.keyChoice}
                              onChange={(e) =>
                                handleMetadataChange(index, {
                                  keyChoice: e.target.value,
                                })
                              }
                              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-2 text-xs text-neutral-900 outline-none ring-0 focus:border-neutral-400 focus:bg-white"
                            >
                              <option value="">Label</option>
                              {currentSpecOptions.map((label) => (
                                <option key={label} value={label}>
                                  {label}
                                </option>
                              ))}
                              <option value="custom">Custom label…</option>
                            </select>
                            {row.keyChoice === "custom" && (
                              <input
                                type="text"
                                value={row.customKey}
                                onChange={(e) =>
                                  handleMetadataChange(index, {
                                    customKey: e.target.value,
                                  })
                                }
                                className="mt-1 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 text-xs text-neutral-900 outline-none ring-0 focus:border-neutral-400 focus:bg-white"
                                placeholder="Custom label"
                              />
                            )}
                          </div>
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={row.value}
                              onChange={(e) =>
                                handleMetadataChange(index, {
                                  value: e.target.value,
                                })
                              }
                              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-2 text-xs text-neutral-900 outline-none ring-0 focus:border-neutral-400 focus:bg-white"
                              placeholder="Detail"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {submitError && (
                    <p className="text-xs text-red-500">{submitError}</p>
                  )}
                  {submitSuccess && (
                    <p className="text-xs text-emerald-600">{submitSuccess}</p>
                  )}

                  <div className="pt-1">
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
                    >
                      {mode === "add" ? "Add item" : "Save changes"}
                    </button>
                  </div>
                </form>
              </section>

              <section className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-neutral-900">
                      Catalogue
                    </h2>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      Tap an item to edit or delete.
                    </p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {allItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col justify-between rounded-xl border border-neutral-100 bg-neutral-50 p-3 text-sm text-neutral-800"
                    >
                      <div className="space-y-1">
                        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                          {item.category}
                        </p>
                        <p className="text-sm font-semibold text-neutral-900">
                          {item.name}
                        </p>
                        {item.brand && (
                          <p className="text-xs text-neutral-500">
                            {item.brand}
                          </p>
                        )}
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="inline-flex flex-1 items-center justify-center gap-1 rounded-full bg-white px-2.5 py-1.5 text-xs font-medium text-neutral-700 shadow-sm ring-1 ring-neutral-200 hover:bg-neutral-50"
                        >
                          <Pencil className="h-3 w-3" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex items-center justify-center rounded-full bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-600 ring-1 ring-red-100 hover:bg-red-100"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {allItems.length === 0 && (
                    <p className="text-xs text-neutral-400">
                      No items yet. Add your first item above.
                    </p>
                  )}
                </div>
              </section>
            </>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
}

