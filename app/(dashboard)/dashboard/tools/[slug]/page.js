import { notFound } from "next/navigation";
import Link from "next/link";
import { TOOLS_CONFIG } from "@/data/toolConfig";

export async function generateStaticParams() {
  return TOOLS_CONFIG.map((tool) => ({
    slug: tool.slug,
  }));
}

const DashboardToolsEditPage = ({ params }) => {
  const tool = TOOLS_CONFIG.find((t) => t.slug === params.slug);
  console.log(tool);
  

  if (!tool) {
    return notFound();
  }
  return <div>this is tools edit page</div>;
};

export default DashboardToolsEditPage;
