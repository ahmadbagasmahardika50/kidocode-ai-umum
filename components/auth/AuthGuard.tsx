"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";

// Halaman yang perlu login.
const PROTECTED = ["/playground", "/dashboard"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isProtected = PROTECTED.some((p) => pathname === p || pathname.startsWith(p + "/"));
  const [authed, setAuthed] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!isProtected) return;
    if (getUser()) {
      setAuthed(true);
    } else {
      setAuthed(false);
      router.replace("/masuk");
    }
  }, [pathname, isProtected, router]);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (isProtected && !authed) return null;
  return <>{children}</>;
}