"use server";

import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";


export const updateBlogServerAction = async (blogId, data) => {
  try {
    await dbConnect();
    const updated = await Blog.findByIdAndUpdate(blogId, data, { new: true });

    return { status: "SUCCESS", blog: updated };
  } catch (err) {
    return { status: "ERROR", message: err.message };
  }
};
