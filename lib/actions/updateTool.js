"use server";

import dbConnect from "../db";
import { editToolFormSchema } from "@/schemas/edit-tool-form-schema";
import ToolModel from "@/models/Tools";
import { toolFormSchema } from "@/schemas/toolFormSchema";

function parseServerActionResponse(response) {
  return JSON.parse(JSON.stringify(response));
}

// ? check if slug is unique
export const checkSlugServerAction = async (slug) => {
  await dbConnect();

  try {
    const query = { slug };
    const existingToolSlug = await ToolModel.findOne(query);
    if (existingToolSlug) {
      return parseServerActionResponse({
        message: "Slug already exists",
        isUnique: false,
      });
    } else {
      return parseServerActionResponse({
        message: "Slug is unique",
        isUnique: true,
      });
    }
  } catch (error) {
    console.error("API error:", error);
    return parseServerActionResponse({
      error: "Error checking slug uniqueness",
    });
  }
};

// ? create a tool
export const createToolServerAction = async (tool) => {
  console.log("Create tool server action", tool);

  await dbConnect();

  try {
    
    const validatedData = toolFormSchema.parse(tool);
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
      return parseServerActionResponse({
        message: "Slug already exists",
        status: 409,
      });
    }

    const newTool = new ToolModel(validatedData);
    await newTool.save();

    return Response.json(newTool, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ error: error.message }, { status: 500 });  
  }
};

// Update a tool

export const updateToolServerAction = async (tool) => {
  await dbConnect();

  try {
    const validateData = editToolFormSchema.parse(tool);

    const { _id, ...data } = validateData;

    const updatedTool = await ToolModel.findByIdAndUpdate(_id, data, {
      new: true, // Return the updated document
      runValidators: true, // Validate the update operation
    });

    return parseServerActionResponse({
      updatedTool,
      error: "",
      status: "SUCCESS",
      message: "Tool updated",
    });
  } catch (error) {
    console.error("API Error:", error);
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
