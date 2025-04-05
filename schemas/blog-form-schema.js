import { z } from "zod";

const isValidImageUrl = (val) =>
  val.startsWith("http") && /\.(jpeg|jpg|png|gif|webp)$/.test(val);

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif",
];

export const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  coverImage: z
    .union([
      z.instanceof(File).refine(
        (file) => {
          return ACCEPTED_IMAGE_TYPES.includes(file.type);
        },
        {
          message:
            "Invalid image type. Only .jpg, .jpeg, .png, .webp formats are supported",
        }
      ),
      z.string().url().refine(isValidImageUrl, {
        message: "Invalid image URL",
      }),
    ])
    .nullable()
    .optional(),
  category: z.string().min(1, "Category is required"),

  // Optional metadata
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),

  // Optional system fields
  featured: z.boolean().optional(),
  views: z.number().optional(),
});
