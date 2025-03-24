import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ToolModel from "@/models/Tools";
import { toolFormSchema } from "@/schemas/toolFormSchema";
import { editToolFormSchema } from "@/schemas/edit-tool-form-schema";
import axios from "axios";
import FormData from "form-data";


// GET /api/admin/tools
export async function GET() {
  await dbConnect();
  const tools = await ToolModel.find();
  console.log(tools);
  
  return Response.json(tools, { status: 200 });
}

// POST /api/admin/tools
export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const validatedData = toolFormSchema.parse(body);

    // Check if fields array is empty and add default field if necessary
    if (!validatedData.fields || validatedData.fields.length === 0) {
      validatedData.fields = [
        {
          name: "dailyUsage",
          label: "Daily Usage",
          type: "number",
          description: "",
          defaultValue: "",
        },
      ];
    }

    const existingTool = await ToolModel.findOne({ slug: validatedData.slug });
    if (existingTool) {
      return NextResponse.json(
        { message: "Slug already exists" },
        { status: 409 }
      );
    }

    const newTool = new ToolModel(validatedData);
    await newTool.save();

    return Response.json(newTool, { status: 201, message: "Tool created" });
  } catch (error) {
    console.error("API Error:", error);

    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return Response.json(
        { message: "Slug must be unique", field: "slug" },
        { status: 409 }
      );
    }

    return Response.json(
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
    const validatedData = editToolFormSchema.parse(body);
    // Check if fields array is empty and add default field if necessary
    if (!validatedData.fields || validatedData.fields.length === 0) {
      validatedData.fields = [
        {
          name: "dailyUsage",
          label: "Daily Usage",
          type: "number",
          description: "",
          defaultValue: "",
        },
      ];
    }

    

    const tool = await ToolModel.findOne({ _id: validatedData._id,});
    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    

    const updatedTool = await ToolModel.findByIdAndUpdate(
      validatedData._id,
      validatedData,
      { new: true, runValidators: true }
    );

    if (!updatedTool) {
      return Response.json({ message: "Tool not found" }, { status: 404 });
    }

    return Response.json(updatedTool, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);

    if (error.code === 11000) {
      return Response.json(
        { message: "Slug must be unique", field: "slug" },
        { status: 409 }
      );
    }

    return Response.json(
      {
        message: error.errors?.[0]?.message || error.message || "Server error",
        ...(error.errors && { errors: error.errors }),
      },
      { status: error.name === "ZodError" ? 422 : 500 }
    );
  }
}
