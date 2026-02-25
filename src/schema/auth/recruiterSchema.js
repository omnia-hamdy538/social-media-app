import { z } from "zod";

export const recruiterSchema = z
  .object({
    companyName: z
      .string()
      .min(1, "Company Name is required")
      .regex(/^[A-Za-z\s]{3,}$/, "Company Name must be at least 3 letters"),

    businessEmail: z
      .string()
      .min(1, "Business Email is required")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
        "Email format is not valid"
      ),

    recruiterPassword: z
      .string()
      .min(1, "Password is required")
      .regex(
        /^[A-Za-z][A-Za-z0-9@_$]{5,}$/,
        "Password must start with a letter and be at least 6 characters"
      ),

    recruiterConfirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine(
    (data) => data.recruiterPassword === data.recruiterConfirmPassword,
    {
      message: "Passwords do not match",
      path: ["recruiterConfirmPassword"],
    }
  );
