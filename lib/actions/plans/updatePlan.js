// lib/actions/planActions/updatePlan.js
"use server";

import dbConnect from "@/lib/db";
import Plans from "@/models/Plans";
import { planFormSchema } from "@/schemas/planFormSchema";

export const updatePlanServerAction = async (id, data) => {
  await dbConnect();
  
  try {
    const validated = planFormSchema.parse(data);

    const updated = await Plans.findByIdAndUpdate(id, validated, {
      new: true,
      runValidators: true,
    });

    return {
      status: "SUCCESS",
      message: "Plan updated successfully",
      plan: updated,
    };
  } catch (error) {
    console.error("Update Plan Error:", error);
    return {
      status: "ERROR",
      message: error.message,
    };
  }
};
