import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";


export async function GET(req, { params }) {
  try {
    await dbConnect();
    const {id} = await params;
    const blog = await Blog.findById(id).populate("category");

    if (!blog) {
      return Response.json(
        { status: "ERROR", message: "Blog not found" },
        { status: 404 }
      );
    }

    return Response.json({ status: "SUCCESS", blog });
  } catch (err) {
    return Response.json(
      { status: "ERROR", message: err.message },
      { status: 500 }
    );
  }
}
