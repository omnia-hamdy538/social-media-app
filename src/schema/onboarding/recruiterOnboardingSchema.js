import { z } from "zod";

export const recruiterOnboardingSchema = z.object({

   companyName: z
    .string()
    .min(1, "Please enter your company name"),   // 👈 جديد

  contactEmail: z
    .string()
    .min(1, "Please enter a contact email")      // 👈 جديد
    .email("That doesn’t look like a valid email"),
  website: z
    .string()
    .min(1, "Please fill in this field")
    .url("That doesn’t look like a valid link"),

  phone: z
    .string()
    .min(1, "Please fill in this field")
    .min(6, "This phone number looks too short")
    .regex(/^[0-9+\-() ]+$/, "Phone must contain numbers only"),

  location: z
    .string()
    .min(1, "Please fill in this field")
    .min(3, "Location doesn’t seem right"),

 
  linkedin: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.startsWith("https://"),
      "LinkedIn link must be a valid URL"
    ),

  github: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.startsWith("https://"),
      "GitHub link must be a valid URL"
    ),

  about: z
    .string()
    .min(1, "Please fill in this field")
    .min(10, "Tell us a bit more (10 chars at least)"),

  
  logo: z.any().optional(),
  profileImage: z.any().optional(),

  recruiterProfile: z
    .string()
    .min(1, "Please fill in this field")
    .url("That doesn’t look like a valid link")
});
