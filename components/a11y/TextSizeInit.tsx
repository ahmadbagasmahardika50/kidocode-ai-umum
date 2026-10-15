"use client";
import { useEffect } from "react";
import { applyTextSize, getTextBig } from "@/lib/prefs";

// Menerapkan pengaturan ukuran teks yang tersimpan saat aplikasi dibuka.
export default function TextSizeInit() {
  useEffect(() => {
    applyTextSize(getTextBig());
  }, []);
  return null;
}