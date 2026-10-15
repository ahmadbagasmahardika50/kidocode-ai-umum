import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import KidoBot from "@/components/bot/KidoBot";
import AuthGuard from "@/components/auth/AuthGuard";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "KidoCode AI - Belajar Logika Coding untuk Anak SD",
  description:
    "Platform belajar logika coding interaktif untuk anak SD dengan asisten KidoBot.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${quicksand.className} antialiased bg-white text-slate-900`}>
        <AuthGuard>{children}</AuthGuard>
        <KidoBot />
      </body>
    </html>
  );
}