import { z } from "zod";

export const updateRoleSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Role name must be at least 3 characters long" })
    .max(50, { message: "Role name must not exceed 50 characters" })
    .regex(/^[a-zA-Z0-9-_]+$/, {
      message:
        "Role name can only contain alphanumeric characters, hyphens, and underscores",
    })
    .optional(),
});

export type UpdateRoleRequestBody = z.infer<typeof updateRoleSchema>;
