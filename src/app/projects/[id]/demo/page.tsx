import { notFound, redirect } from "next/navigation";
import { projects } from "@/data/projects";
export default async function DemoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!projects.some((project) => project.id === id)) notFound();
  redirect(`/projects/${encodeURIComponent(id)}`);
}
