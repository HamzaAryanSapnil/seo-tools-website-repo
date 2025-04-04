import { z } from "zod";

export const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().url("Cover image must be a valid URL"),
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
