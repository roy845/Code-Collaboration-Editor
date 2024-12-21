import { z } from "zod";

export const SignupSchema = z
  .object({
    username: z
      .string()
      .min(4, "Username must be at least 4 characters long")
      .max(20, "Username must be at most 20 characters long")
      .nonempty("Username is required"),

    email: z
      .string()
      .email("Invalid email address")
      .min(5, "Email must be at least 5 characters long")
      .max(100, "Email must be at most 100 characters long")
      .nonempty("Email is required"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(32, "Password must be at most 32 characters long")
      .regex(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        "Password too weak. It must contain at least one uppercase letter (A-Z), at least one lowercase letter (a-z), and at least one digit (0-9) or special character (any non-word character)."
      )
      .nonempty("Password is required"),

    confirmPassword: z.string().nonempty("Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
