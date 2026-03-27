"use client";

import { AdminAuthProvider } from "@/context/AdminAuthContext";
import { DataProvider } from "@/context/DataContext";
import { ProjectProvider } from "@/context/ProjectContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <ProjectProvider>
        <DataProvider>{children}</DataProvider>
      </ProjectProvider>
    </AdminAuthProvider>
  );
}
