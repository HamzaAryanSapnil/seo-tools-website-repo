import dbConnect from "@/lib/db";
import BlogCategory from "@/models/BlogCategory";


export async function GET() {
  try {
    await dbConnect();
    const categories = await BlogCategory.find().populate("parentCategory");
    return Response.json({ status: "SUCCESS", categories });
  } catch (err) {
    return Response.json(
      { status: "ERROR", message: err.message },
      { status: 500 }
    );
  }
}
