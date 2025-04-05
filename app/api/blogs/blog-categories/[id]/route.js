import dbConnect from "@/lib/db";
import BlogCategory from "@/models/BlogCategory";


export async function GET(req, { params }) {
  try {

    await dbConnect();
    const {id} = await params;
    const category = await BlogCategory.findById(id).populate(
      "parentCategory"
    );

    if (!category) {
      return Response.json(
        { status: "ERROR", message: "Category not found" },
        { status: 404 }
      );
    }

    return Response.json({ status: "SUCCESS", category });
  } catch (err) {
    return Response.json(
      { status: "ERROR", message: err.message },
      { status: 500 }
    );
  }
}
