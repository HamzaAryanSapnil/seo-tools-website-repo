// app/blogs/page.js
import axios from "axios";
import BlogsCard from "@/components/BlogsCard";

// Fetch all blogs server-side with revalidation
export default async function BlogsPage() {
  try {
    const response = await axios.get(`http://localhost:3000/api/blogs`);
    const blogs = response?.data?.simplifiedBlogs || [];

    return (
      <div className="container mx-auto p-8 min-h-screen">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-seo-first-color mb-4">
            Discover Our Latest Blogs
          </h1>
          <p className="text-lg text-seo-des-color-second max-w-3xl mx-auto">
            Dive into the world of insightful articles, industry trends, and
            engaging stories. Stay informed and inspired with our handpicked
            blogs on various topics.
          </p>
        </header>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {blogs?.map((item) => (
            <BlogsCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return <div>Error loading blogs</div>;
  }
}

// Set revalidation to make the page dynamic
export const revalidate = 10; // Revalidate every 10 seconds
