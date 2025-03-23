import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ToolModel from "@/models/Tools";
import { toolFormSchema } from "@/schemas/toolFormSchema";

// POST /api/admin/tools
export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const validatedData = toolFormSchema.parse(body);

    const existingTool = await ToolModel.findOne({ slug: validatedData.slug });
    if (existingTool) {
      return NextResponse.json(
        { message: "Slug already exists" },
        { status: 409 }
      );
    }

    const newTool = new ToolModel(validatedData);
    await newTool.save();

    return NextResponse.json(newTool, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);

    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Slug must be unique", field: "slug" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        message: error.errors?.[0]?.message || error.message || "Server error",
        ...(error.errors && { errors: error.errors }),
      },
      { status: error.name === "ZodError" ? 422 : 500 }
    );
  }
}

// PUT /api/admin/tools
export async function PUT(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const validatedData = toolFormSchema.parse(body);

    // Check for slug uniqueness excluding current document
    const existingTool = await ToolModel.findOne({
      slug: validatedData.slug,
      _id: { $ne: validatedData._id },
    });

    if (existingTool) {
      return NextResponse.json(
        { message: "Slug already exists" },
        { status: 409 }
      );
    }

    const updatedTool = await ToolModel.findByIdAndUpdate(
      validatedData._id,
      validatedData,
      { new: true, runValidators: true }
    );

    if (!updatedTool) {
      return NextResponse.json({ message: "Tool not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTool, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Slug must be unique", field: "slug" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        message: error.errors?.[0]?.message || error.message || "Server error",
        ...(error.errors && { errors: error.errors }),
      },
      { status: error.name === "ZodError" ? 422 : 500 }
    );
  }
}
