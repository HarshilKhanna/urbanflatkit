import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/context/DataContext";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "UrbanFlatKit",
  description: "UrbanFlatKit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans antialiased`}>
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
