import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";


export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find().populate("category");
    return Response.json({ status: "SUCCESS", blogs, message: "Blogs fetched successfully" });
  } catch (err) {
    return Response.json(
      { status: "ERROR", message: err.message },
      { status: 500 }
    );
  }
}
