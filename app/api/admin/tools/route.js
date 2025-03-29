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

  
  return Response.json(tools, { status: 200 });
}



