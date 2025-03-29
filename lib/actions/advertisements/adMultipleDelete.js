// lib/actions/advertisements/deleteMultiple.js
"use server";

import dbConnect from "@/lib/db";
import Advertisement from "@/models/advertisement";

export const deleteMultipleAdvertisements = async (ids) => {
  try {
    await dbConnect();
    // Delete multiple advertisements by IDs
    const result = await Advertisement.deleteMany({ _id: { $in: ids } });
    if (result.deletedCount === 0) throw new Error("No advertisements deleted");

    return { success: true, count: result.deletedCount };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
