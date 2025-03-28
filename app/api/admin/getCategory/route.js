// app/api/categories/route.js
import { NextResponse } from "next/server";

import Category from "@/models/Category";
import dbConnect from "@/lib/db";

export async function GET() {
  try {
    await dbConnect();

    const categories = await Category.find({})
      .select("name slug title toolsCount createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        status: "SUCCESS",
        message: "Categories fetched successfully",
        data: categories,
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=60",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "ERROR",
        error: error.message || "Failed to fetch categories",
      },
      {
        status: 500,
      }
    );
  }
}
