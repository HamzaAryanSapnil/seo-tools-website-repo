import { z } from "zod";

export const imageAdvertisementFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  targetUrl: z.string().optional(),
  image: z
    .any()
    .refine(
      (file) => file instanceof File && file.type.startsWith("image/"), // Check if it's a File object and starts with "image/"
      { message: "You must upload a valid image file." }
    )
    .refine(
      (file) =>
        file &&
        ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(
          file.type
        ), // Check specific image types
      { message: "Only JPEG, JPG, PNG, or WebP images are allowed." }
    )
    .nullable()
    .optional(),
});
