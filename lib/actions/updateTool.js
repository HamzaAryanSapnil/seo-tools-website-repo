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

    return parseServerActionResponse({
      status: "SUCCESS",
    // Convert to plain object
      message: "Tool created successfully",
    });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ error: error.message, status: "ERROR" });
  }
};

// Update a tool

export const updateToolServerAction = async (tool) => {
  await dbConnect();

  try {
    const validateData = editToolFormSchema.parse(tool);

    const { _id, ...data } = validateData;
    console.log("Update tool server action: ", _id, );
    

    const updatedTool = await ToolModel.findByIdAndUpdate(_id, data, {
      new: true, // Return the updated document
      runValidators: true, // Validate the update operation
    });
    
    return parseServerActionResponse({
       status: "SUCCESS",
      message: "Tool updated",
    });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({
      error: error.message,
      status: "ERROR",
    });
  }
};

// ? delete a single tool and multiple tools
// Add these delete functions
export const deleteToolServerAction = async (id) => {
  await dbConnect();

  try {
    const deletedTool = await ToolModel.findByIdAndDelete(id);
    console.log("Deleted Tool:", deletedTool);
    

    return parseServerActionResponse({
    
      status: "SUCCESS",
      message: `Tool deleted successfully.`,
    });
  } catch (error) {
    console.error("Delete Error:", error);
    return Response.json({
      error: error.message,
      status: "ERROR",
    });
  }
};

export const deleteMultipleToolsServerAction = async (ids) => {
  await dbConnect();

  try {
    if (!Array.isArray(ids)) {
      return Response.json({
        error: "Invalid input formant",
        status: "ERROR",
      });
    }

    const deleteResult = await ToolModel.deleteMany({
      _id: { $in: ids },
    });

    if (deleteResult?.deletedCount === 0) {
      return Response.json({
        error: "No tools found to delete",
        status: "ERROR",
      });
    }

    return parseServerActionResponse({
      deletedCount: deleteResult?.deletedCount,
      status: "SUCCESS",
      message: `${deleteResult?.deletedCount} tools deleted successfully`,
    });
  } catch (error) {
    console.error("Bulk Delete Error:", error);
    return Response.json({
      error: error.message,
      status: "ERROR",
    });
  }
};
