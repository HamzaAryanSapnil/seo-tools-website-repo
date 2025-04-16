import BlogDetails from "@/components/BlogDetails";
import axios from "axios";

export const revalidate = 10; // Optional: Set revalidation for dynamic content

const BlogDetailsPage = async ({ params }) => {
  const { id } = params; // Dynamic blog ID from URL

  // Fetch the single blog details
  const blogResponse = await axios.get(`http://localhost:3000/api/blogs/${id}`);
  const blog = blogResponse?.data?.simplifiedBlogs;
  console.log("Single Blog: ", blog);
  

  

  // Fetch blog categories for the sidebar
//   const categoriesResponse = await axios.get(
//     "http://localhost:3000/api/blogs/blog-categories"
//   );
//   const categories = categoriesResponse?.data?.simplifiedBlogsCategories;
//   console.log("Blog Categories: ", categories);
  

//  const recentPosts = [];

  // Pass all data to the BlogDetails component
  return (
    <BlogDetails
      blog={blog}
      // categories={categories}
      // recentPosts={recentPosts}
    />
  );
};

export default BlogDetailsPage;
