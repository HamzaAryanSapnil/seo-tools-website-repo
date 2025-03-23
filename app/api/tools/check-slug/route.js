// api/tools/check-slug.js
// import dbConnect from "@/lib/db";
// import Tool from "@/models/Tool";

import dbConnect from "@/lib/db";
import ToolModel from "@/models/Tools";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();

   const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get("slug");
  console.log("Slug:", slug);

  try {
    const query = { slug };
    console.log("Query:", query);
    
    // const existingToolSlug = await ToolModel.findOne(query);
    // return res.status(200).json({ isUnique: !existingToolSlug });
    const existingToolSlug = await ToolModel.findOne(query);
    if (existingToolSlug) {
      return Response.json(
        { message: "Slug already exists", isUnique: false },
        { status: 409 },
        
      )} else{
        return Response.json(
        { message: "Slug is unique", isUnique: true },
        { status: 200 },
      );
      }
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: "Error checking slug uniqueness" });
  }
}
