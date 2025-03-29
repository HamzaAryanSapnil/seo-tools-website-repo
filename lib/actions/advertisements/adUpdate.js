// lib/actions/advertisements/update.js
"use server";
import Advertisement from "@/models/advertisement";
import {
  codeAdvertisementFormSchema,
  imageAdvertisementFormSchema,
  textAdvertisementFormSchema,
} from "@/schemas";
import dbConnect from "@/lib/db";

const handleUpdate = async (id, values) => {
  try {
    await dbConnect();

    // Find the advertisement by ID
    const existingAd = await Advertisement.findById(id);
    if (!existingAd) throw new Error("Advertisement not found");

    // Validate based on the advertisement type
    switch (existingAd.type) {
      case "text":
        await textAdvertisementFormSchema.parseAsync(values);
        break;
      case "image":
        await imageAdvertisementFormSchema.parseAsync(values);
        break;
      case "code":
        await codeAdvertisementFormSchema.parseAsync(values);
        break;
      default:
        throw new Error("Invalid advertisement type");
    }

    // Update the advertisement in the database
    const updatedAd = await Advertisement.findByIdAndUpdate(
      id,
      {
        $set: values,
      },
      { new: true }
    );

    return { success: true, data: updatedAd };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateAdvertisement = handleUpdate;
