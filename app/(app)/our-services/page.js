import AllCategoriesGrid from '@/components/Our-Services/AllCategoriesGrid'
import { TOOLS_CONFIG } from '@/data/toolConfig';
import React from 'react'


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
const OurServices = () => {
    const categories = getToolsByCategory();
  return (
    <section className='' >
      <AllCategoriesGrid categories={categories}/>
    </section>
  )
}

export default OurServices
