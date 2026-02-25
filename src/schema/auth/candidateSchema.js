import { z } from "zod";

export const candidateSchema = z
  .object({
    name: z
      .string()
      .min(1, "You must enter your name")
      .regex(/^[A-Za-z\s]{3,}$/, "Name must be only letters and at least 3 characters"),

    email: z
      .string()
      .min(1, "You must enter your email")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
        "Email format is not valid"
      ),

    password: z
      .string()
      .min(1, "You must enter a password")
      .regex(
        /^[A-Za-z][A-Za-z0-9@_$]{5,}$/,
        "Password must start with a letter and be at least 6 characters"
      ),

    confirmPassword: z.string().min(1, "You must confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
