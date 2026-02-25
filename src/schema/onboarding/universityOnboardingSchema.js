import { z } from "zod";

export const universityOnboardingSchema = z.object({
  website: z
    .string()
    .min(1, "You must enter your website")
    .url("Website link is not valid"),

  phone: z
    .string()
    .min(1, "You must enter organization phone"),

  location: z
    .string()
    .min(1, "You must enter organization location"),

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
    .min(1, "Please enter details about the organization"),

  recruiterProfile: z
    .string()
    .min(1, "Please enter recruiter profile"),
});
