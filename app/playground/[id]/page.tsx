import { notFound } from "next/navigation";
import { MISSIONS } from "@/lib/missions";
import PlayClient from "@/components/play/PlayClient";

// Membuat halaman misi sebagai halaman statis saat build.
export function generateStaticParams() {
  return MISSIONS.map((m) => ({ id: String(m.id) }));
}

export default async function MissionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const mission = MISSIONS.find((m) => m.id === Number(id));
  if (!mission) notFound();
  return <PlayClient mission={mission} />;
}