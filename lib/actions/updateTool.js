"use server";

import dbConnect from "../db";
import { editToolFormSchema } from "@/schemas/edit-tool-form-schema";
import ToolModel from "@/models/Tools";

function parseServerActionResponse(response) {
  return JSON.parse(JSON.stringify(response));
}

export const updateToolServerAction = async (tool) => {
  await dbConnect();

  try {
    const validateData =  editToolFormSchema.parse(tool);

    const { _id, ...data } = validateData;

    const updatedTool = await ToolModel.findByIdAndUpdate(_id, data, {
      new: true, // Return the updated document
      runValidators: true, // Validate the update operation
    });

    console.log("Updated tool:", updatedTool);

    //    return Response.json(updatedTool, {
    //      status: 200,
    //      message: "Tool updated",
    //    });
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
