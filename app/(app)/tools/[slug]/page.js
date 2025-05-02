// app/tools/[slug]/page.tsx
import ToolContent from "@/components/ToolContent";
import ToolRenderer from "@/components/ToolRenderer";
import { getToolData } from "@/lib/tools";
import axios from "axios";

export async function generateMetadata({
  params,
}) {
  const { slug } = await params;
  const tool = await getToolData(slug);
  return {
    title: `${tool.title} - MonsterTools`,
    description: tool.description,
  };
}

export default async function ToolPage({ params }) {
  const { slug } = await params;
   const response = await fetch(
     `http://localhost:3000/api/admin/tools/${slug}`
   );
   const tool = await response.json();
     const categoriesResponse = await axios.get(
       "http://localhost:3000/api/blogs/blog-categories"
     );
     const categories = categoriesResponse?.data?.simplifiedBlogsCategories;

      const toolCategoriesResponse = await axios.get(
        "http://localhost:3000/api/admin/getCategory"
      );
      const toolCategories = toolCategoriesResponse?.data?.data;


      const recentBlogResponse = await axios.get(
        `http://localhost:3000/api/blogs?recent=true`
      );
      const blogs = recentBlogResponse?.data?.simplifiedBlogs || [];
 
   
  return (
    <div className="container py-8 mx-auto min-h-screen space-y-20 p-4">
      <ToolRenderer toolSlug={slug} toolDetails={tool} />
      <ToolContent toolDetails={tool} categories={categories} recentPosts={blogs} toolCategories={toolCategories} />
    </div>
  );
}
