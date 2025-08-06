// src/app/layout.tsx
import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "NirogCare",
  description: "Your AI Health Navigator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="flex flex-1">
          <Sidebar/> {/* ✅ Optional: left sidebar */}
          <main className="flex-1 p-4">{children}</main>
        </div>
        </body>
    </html>
  );
}
