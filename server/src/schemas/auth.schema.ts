import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(30, { message: "Username must be at most 30 characters" }),
  email: z.string().email({ message: "Email must be a valid email address" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be at most 32 characters long")
    .regex(
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      "Password too weak. It must contain at least one uppercase letter (A-Z), at least one lowercase letter (a-z), and at least one digit (0-9) or special character (any non-word character)."
    ),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Email must be a valid email address" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be at most 32 characters long")
    .regex(
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      "Password too weak. It must contain at least one uppercase letter (A-Z), at least one lowercase letter (a-z), and at least one digit (0-9) or special character (any non-word character)."
    ),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Email must be a valid email address" }),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().nonempty({ message: "Token is required" }),
    newPassword: loginSchema.shape.password,
    confirmNewPassword: loginSchema.shape.password,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords must match",
    path: ["confirmNewPassword"],
  });

export type RegisterRequestBody = z.infer<typeof registerSchema>;

export type LoginRequestBody = z.infer<typeof registerSchema>;

export type ForgotPasswordRequestBody = z.infer<typeof forgotPasswordSchema>;

export type ResetPasswordRequestBody = z.infer<typeof resetPasswordSchema>;
