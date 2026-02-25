import { z } from "zod";

/* ================= Regex ================= */
const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]{2,}(\/.*)?$/;
const linkedInRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/.+$/;
const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/.+$/;

/* ================= Validation Schema ================= */
export const applySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
    
  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone must be 10 digits"),
    
  cv: z
  .instanceof(File, { message: "CV is required" })
  .refine(
    (file) =>
      ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type),
    { message: "Only PDF or Word files are allowed" }
  ),

    
  linkedin: z
    .string()
    .url("Invalid LinkedIn URL")
    .regex(linkedInRegex, "LinkedIn URL must start with linkedin.com"),
    
  github: z
    .string()
    .url("Invalid GitHub URL")
    .regex(githubRegex, "GitHub URL must start with github.com"),
    
  portfolio: z
    .string()
    .url("Invalid Portfolio URL")
    .optional()
    .or(z.literal("")),
    
  location: z
    .string()
    .min(1, "Location is required")
    .refine((val) => ["Cairo", "Giza", "Alexandria"].includes(val), "Select a valid location"),
    
  motivation: z
    .string()
    .min(10, "Motivation must be at least 10 characters")
    .max(100, "Motivation must be at most 100 characters"),
});
