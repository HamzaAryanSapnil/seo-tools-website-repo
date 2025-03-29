// lib/actions/advertisements/delete.js
"use server";
import Advertisement from "@/models/advertisement";
import dbConnect from "@/lib/db";

export const deleteAdvertisement = async (id) => {
  try {
    await dbConnect();
    // Find and delete the advertisement by ID
    const result = await Advertisement.findByIdAndDelete(id);
    if (!result) throw new Error("Advertisement not found");

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
