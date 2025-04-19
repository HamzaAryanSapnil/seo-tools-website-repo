import BlogDetails from "@/components/BlogDetails";
import axios from "axios";

export const revalidate = 10; // Optional: Set revalidation for dynamic content

const BlogDetailsPage = async ({ params }) => {
  const { id } = await params; // Dynamic blog ID from URL

  // Fetch the single blog details
  const blogResponse = await axios.get(`http://localhost:3000/api/blogs/${id}`);
  const blog = blogResponse?.data?.simplifiedBlogs;

      const response = await axios.get(`http://localhost:3000/api/blogs?recent=true`);
      const blogs = response?.data?.simplifiedBlogs || [];

  // Fetch blog categories for the sidebar
  const categoriesResponse = await axios.get(
    "http://localhost:3000/api/blogs/blog-categories"
  );
  const categories = categoriesResponse?.data?.simplifiedBlogsCategories;


  // Fetch tool categories for the sidebar
  const toolCategoriesResponse = await axios.get(
    "http://localhost:3000/api/admin/getCategory"
  );
  const toolCategories = toolCategoriesResponse?.data?.data;
  
  
 

  //  const recentPosts = [];

  // Pass all data to the BlogDetails component
  return (
    <BlogDetails
      blog={blog}
      categories={categories}
      // recentPosts={recentPosts}
      toolCategories={toolCategories}
      recentPosts={blogs}
    />
  );
};

export default BlogDetailsPage;
