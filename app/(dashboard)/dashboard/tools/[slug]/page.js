
import { notFound } from "next/navigation";
import Link from "next/link";
import { TOOLS_CONFIG } from "@/data/toolConfig";
import EditToolForm from "@/components/EditToolsPage";

export async function generateStaticParams() {
  return TOOLS_CONFIG.map((tool) => ({
    slug: tool.slug,
  }));
}

const DashboardToolsEditPage = ({ params }) => {
  const tool = TOOLS_CONFIG.find((t) => t.slug === params.slug);

  if (!tool) {
    return notFound();
  }
  return (
    <div className="min-h-screen flex justify-center items-center w-full">
      <EditToolForm />
    </div>
  );
};

export default DashboardToolsEditPage;
