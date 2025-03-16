import { z } from "zod";

export const planFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  yearlyPrice: z.coerce.number().min(0, "Must be a positive number"),
  monthlyPrice: z.coerce.number().min(0, "Must be a positive number"),
  allow_api: z.boolean(),
  no_ads: z.boolean(),
  dailyUsege: z.coerce.number().min(0, "Must be 0 or higher"),
  wordCount: z.coerce.number().min(0, "Must be 0 or higher"),
  fileSize: z.coerce.number().min(0, "Must be 0 or higher"),
  numberOfImage: z.coerce.number().min(0, "Must be 0 or higher"),
  numberOfDomain: z.coerce.number().min(0, "Must be 0 or higher"),
  tools: z.record(
    z.string(),
    z.object({
      dailyUsage: z.coerce.number().min(0).optional(),
      fileSize: z.coerce.number().min(0).optional(),
      // ... other tool-specific fields
    })
  ),
});
