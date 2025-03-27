import { notFound } from "next/navigation";
import { TOOLS_CONFIG } from "@/data/toolConfig";
import EditToolForm from "@/components/EditToolsPage";

export async function generateStaticParams() {
  return TOOLS_CONFIG.map((tool) => ({
    slug: tool.slug,
  }));
}

const DashboardToolsEditPage = async ({ params }) => {
  const { slug } = await params;
  const response = await fetch(`http://localhost:3000/api/admin/tools/${slug}`);
  const tool = await response.json();

  

  if (!tool) {
    return notFound();
  }
  return (
    <div className="min-h-screen flex flex-col gap-y-14 justify-center items-center w-full">
      <h2 className="text-2xl font-semibold">
        Edit Tool {tool.name} ({tool.slug})
      </h2>
      <EditToolForm tool={tool} />
    </div>
  );
};

export default DashboardToolsEditPage;
