export function getToolsByCategory() {
  // Group tools by category with count
  const categories = TOOLS_CONFIG.reduce((acc, tool) => {
    const category = acc.find((c) => c.slug === tool.category);
    if (category) {
      category.tools.push(tool);
      category.totalTools++;
    } else {
      acc.push({
        slug: tool.category,
        name: `${tool.category.replace(/-/g, " ")} Tools`,
        tools: [tool],
        totalTools: 1,
      });
    }
    return acc;
  }, []);

  // Sort categories by tool count
  return categories.sort((a, b) => b.totalTools - a.totalTools);
}
