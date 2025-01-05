import { z } from "zod";
import { UserRole } from "../models/user.model";

export const RemoveRolesSchema = z.object({
  roles: z
    .array(z.nativeEnum(UserRole))
    .nonempty("Roles array must not be empty"),
});
