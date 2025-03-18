import { TOOLS_CONFIG } from "@/data/toolConfig";

// Create a lib/tools.js with:
export async function getToolsByCategory() {
  // Fetch from API or database
  return TOOLS_CONFIG.reduce((acc, tool) => {
    const category = acc.find((c) => c.slug === tool.category);
    if (category) {
      category.tools.push(tool);
    } else {
      acc.push({
        slug: tool.category,
        name: `${tool.category} Tools`, // Replace with actual category names
        tools: [tool],
      });
    }
    return acc;
  }, []);
}
