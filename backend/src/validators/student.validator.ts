import { z } from "zod";

// Shared rules for both create and update use-cases
export const createStudentSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  phone: z.string().trim().min(1, "Phone is required"),

  class: z.string().trim().min(1, "Class is required"),

  status: z.enum(["active", "inactive"], {
    error: "Status is required",
  }),
});

// For updates, every field becomes optional but keeps the same validation rules
export const updateStudentSchema = createStudentSchema.partial();
