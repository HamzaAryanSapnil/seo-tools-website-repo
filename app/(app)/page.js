import HeroSection from "@/components/Homepage/Hero";
import CategoriesGrid from "@/components/Homepage/CategoriesGrid";
import { TOOLS_CONFIG } from "@/data/toolConfig";
import SeoStudioToolsStats from "@/components/Homepage/SeoStudioToolsStats";
import FeedBackSliderDetails from "@/components/Homepage/FeedBackSliderDetails";
import LatestInstagramArticlesSliderDetails from "@/components/Homepage/LatestInstagramArticlesSliderDetails";
import WhyShouldYouSec from "@/components/Homepage/WhyShouldYouSec";
import SiteOverviewCard from "@/components/Homepage/SiteOverviewCard";
import axios from "axios";

const getToolsByCategory = () => {
  // Group tools by category from TOOLS_CONFIG with validation
  const categoriesMap = TOOLS_CONFIG.reduce((acc, tool) => {
    // Skip tools without category
    if (!tool.category) return acc;

    const categorySlug = tool.category.trim().toLowerCase();
    const displayName = categorySlug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()); // Convert "pdf-tools" to "Pdf Tools"

    if (!acc[categorySlug]) {
      acc[categorySlug] = {
        slug: categorySlug,
        name: displayName,
        tools: [],
        layoutType: categorySlug === "keywords" ? "list" : "grid",
      };
    }

    acc[categorySlug].tools.push(tool);
    return acc;
  }, {});

  // Convert to array and sort
  return Object.values(categoriesMap).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
};

export default async function Home() {
  // const categories = getToolsByCategory();
  const res = await axios("http://localhost:3000/api/admin/tools");
  const tools = res?.data || [];
    const toolsCatRes = await axios.get(
      "http://localhost:3000/api/admin/getCategory?homepage=true"
    );
    const categories = toolsCatRes?.data?.data;


  

  return (
    <main className="">
      {/* <HeroSection /> */}
      <SeoStudioToolsStats />
      <CategoriesGrid categories={categories} tools={tools}/>
      <FeedBackSliderDetails />
      <LatestInstagramArticlesSliderDetails />
      <WhyShouldYouSec />
      <SiteOverviewCard />
    </main>
  );
}
