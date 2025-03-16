"use client";
import { z } from "zod";

export const createPageFormSchema = z.object({
  title: z.string().min(3).max(100),
  slug: z
    .string()
    .min(3)
    .max(100)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase and hyphen-separated"
    ),
 content: z
  .string()
  .min(20, "Content must be at least 20 characters")
  .refine((val) => {
    // Strip Markdown formatting but keep image alt texts
    const plainText = val
      .replace(/#{1,6}\s?/g, "") // Remove headers
      .replace(/\*{1,2}(.*?)\*{1,2}/g, "$1") // Remove bold/italic
      .replace(/!?\[(.*?)\]\(.*?\)/g, "$1") // Keep alt text for images, remove links
      .replace(/`{1,3}(.*?)`{1,3}/g, "$1") // Remove code markers
      .replace(/-{3,}/g, "") // Remove HRs
      .trim();

    return plainText.length >= 20 && plainText.length <= 10000;
  }, "Content must have 20-10,000 characters of actual text (excluding Markdown formatting). Note: Image alt text counts toward this limit."),

  excerpt: z.string().max(300).optional(),
  metaTitle: z.string().min(3).max(100),
  metaDescription: z.string().max(160).optional(),
  status: z.enum(["draft", "published"]) ,
});
