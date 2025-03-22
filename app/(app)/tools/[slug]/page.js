// app/tools/[slug]/page.tsx
import ToolRenderer from "@/components/ToolRenderer";
import { getToolData } from "@/lib/tools";

export async function generateMetadata({
  params,
}) {
  const tool = await getToolData(params.slug);
  return {
    title: `${tool.title} - MonsterTools`,
    description: tool.description,
  };
}

export default function ToolPage({ params }) {
  return (
    <div className="container py-8 mx-auto min-h-screen ">
      <ToolRenderer toolSlug={params.slug} />
    </div>
  );
}
