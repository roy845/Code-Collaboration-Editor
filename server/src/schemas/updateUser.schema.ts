import { z } from "zod";
import { UserRole } from "../models/user.model";

export const UpdateUserSchema = z.object({
  username: z.string().optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be at most 32 characters long")
    .regex(
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      "Password too weak. It must contain at least one uppercase letter (A-Z), at least one lowercase letter (a-z), and at least one digit (0-9) or special character (any non-word character)."
    )
    .or(z.literal(""))
    .optional(),
  email: z.string().email("Invalid email address").optional(),
  roles: z.array(z.nativeEnum(UserRole)).optional(),
});

export type UpdateUserFormValues = z.infer<typeof UpdateUserSchema>;
