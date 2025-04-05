import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import BlogCategory from "@/models/BlogCategory";



export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find().populate({
      path: "category",
      select: "name", // 👈 only get category name
    });
    // Check if blogs are found
      const simplifiedBlogs = blogs?.map((blog) => {
        const blogObj = blog.toObject();

        return {
          ...blogObj,
          category: blogObj.category?.name || null, // ✅ Only the name as a string
        };
      });
    
   

    return Response.json({
      status: "SUCCESS",
      simplifiedBlogs,
      message: "Blogs fetched successfully",
    });
  } catch (err) {
    return Response.json(
      { status: "ERROR", message: err.message },
      { status: 500 }
    );
  }
}
