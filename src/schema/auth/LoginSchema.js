import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("You must enter your email")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email"
    ),

  password: z
    .string()
    .nonempty("You must enter your password")
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^[A-Za-z][A-Za-z0-9@_$]{5,}$/,
      "Password must contain letters and numbers"
    ),
});
