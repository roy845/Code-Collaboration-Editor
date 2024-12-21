import { z } from "zod";
import { SignupSchema } from "../schemas/signupSchema.schema";
import LoginSchema from "../schemas/loginSchema.schema";
// import ForgotPasswordSchema from "../schemas/forgotPasswordSchema.schema";
// import { ResetPasswordSchema } from "../schemas/resetPasswordSchema.schema";

export type SignupData = z.infer<typeof SignupSchema>;
export type LoginData = z.infer<typeof LoginSchema>;
// export type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>;
// export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;
