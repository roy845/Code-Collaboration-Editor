import { OpenAPIV3 } from "openapi-types";

export const RegisterRequestBody: OpenAPIV3.SchemaObject = {
  type: "object",
  required: ["email", "password", "username"],
  properties: {
    email: { type: "string", format: "email", example: "user@example.com" },
    password: {
      type: "string",
      format: "password",
      example: "StrongPassword123!",
    },
    username: { type: "string", example: "john_doe" },
  },
};

export const LoginRequestBody: OpenAPIV3.SchemaObject = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: { type: "string", format: "email", example: "user@example.com" },
    password: {
      type: "string",
      format: "password",
      example: "StrongPassword123!",
    },
  },
};

export const LoginResponseDTO: OpenAPIV3.SchemaObject = {
  type: "object",
  properties: {
    message: { type: "string", example: "Login successful" },
    accessToken: {
      type: "string",
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    },
    refreshToken: {
      type: "string",
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    },
  },
};

export const ForgotPasswordRequestBody: OpenAPIV3.SchemaObject = {
  type: "object",
  required: ["email"],
  properties: {
    email: { type: "string", format: "email", example: "user@example.com" },
  },
};

export const ForgotPasswordResponseDTO: OpenAPIV3.SchemaObject = {
  type: "object",
  properties: {
    message: {
      type: "string",
      example: "Password reset email sent successfully.",
    },
  },
};

export const ResetPasswordRequestBody: OpenAPIV3.SchemaObject = {
  type: "object",
  required: ["token", "newPassword", "confirmNewPassword"],
  properties: {
    token: { type: "string", example: "reset-token" },
    newPassword: {
      type: "string",
      format: "password",
      example: "NewStrongPassword123!",
    },
    confirmNewPassword: {
      type: "string",
      format: "password",
      example: "NewStrongPassword123!",
    },
  },
};
