// app/tools/[slug]/page.tsx
import ToolContent from "@/components/ToolContent";
import ToolRenderer from "@/components/ToolRenderer";
import { getToolData } from "@/lib/tools";
import axios from "axios";
import { cache } from "react";

const getBlogDetails = cache(async (slug) => {
  const response = await fetch(`http://localhost:3000/api/admin/tools/${slug}`);
  const tool = await response.json();
  return tool;
});
export async function generateMetadata({ params }) {
   const { slug } = await params;
  const tool = await getBlogDetails(slug); // Fetch the blog details using the ID
  return {
    title: `${tool?.name}`,
    description: tool?.excerpt
      ? tool?.excerpt
      : " This is our free digital marketing tool",
    openGraph: {
      title: `${tool?.name}`,
      description: tool?.excerpt
        ? tool?.excerpt
        : "Free digital marketing tool",
      type: "website",
      url: `http://localhost:3000/tools/${slug}`,
      images: [
        {
          url: tool?.image,
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

export default async function ToolPage({ params }) {
  const { slug } = await params;
  const tool = await getToolData(slug);
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
