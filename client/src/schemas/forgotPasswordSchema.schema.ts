import { z } from "zod";

const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters long")
    .max(100, "Email must be at most 100 characters long")
    .nonempty("Email is required"),
});

export default ForgotPasswordSchema;
