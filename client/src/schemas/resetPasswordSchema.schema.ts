import { z } from "zod";

const ResetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(32, "Password must be at most 32 characters long")
      .regex(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        "Password too weak. It must contain at least one uppercase letter (A-Z), at least one lowercase letter (a-z), and at least one digit (0-9) or special character (any non-word character)."
      )
      .nonempty("Password is required"),

    confirmNewPassword: z.string().nonempty("Confirm Password is required"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default ResetPasswordSchema;
