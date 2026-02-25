import { z } from "zod";

export const organizationSchema = z.object({
  organizationName: z
    .string()
    .min(1, "Please fill in this field")
    .regex(/^[A-Za-z\s]{3,50}$/, "Organization name must contain only letters and be 3–50 characters"),

  organizationEmail: z
    .string()
    .min(1, "Please fill in this field") 
    .email("Email format is not valid"),

  organizationPassword: z
    .string()
    .min(1, "Please fill in this field")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/,
      "Password must be at least 6 characters and include uppercase, lowercase and numbers"
    ),

  organizationConfirmPassword: z
    .string()
    .min(1, "Please fill in this field") 
}).refine(
  (data) => data.organizationPassword === data.organizationConfirmPassword,
  {
    message: "Passwords do not match",
    path: ["organizationConfirmPassword"],
  }
);
