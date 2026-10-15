import { notFound } from "next/navigation";
import { MISSIONS } from "@/lib/missions";
import PlayClient from "@/components/play/PlayClient";

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