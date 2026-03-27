"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    void (async () => {
      try {
        const { getActiveProject } = await import("@/lib/firestore");
        const project = await getActiveProject();
        if (!alive) return;
        if (project?.slug) {
          router.replace(`/${project.slug}`);
          return;
        }
        setLoading(false);
      } catch {
        if (!alive) return;
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7f5] px-4 text-center">
      <p className="text-sm text-neutral-500">
        {loading ? "Opening active project..." : "No active project found."}
      </p>
    </div>
  );
}
