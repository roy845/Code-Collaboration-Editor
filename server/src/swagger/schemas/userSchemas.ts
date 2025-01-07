import { OpenAPIV3 } from "openapi-types";

export const User: OpenAPIV3.SchemaObject = {
  type: "object",
  properties: {
    id: { type: "string", example: "abc123" },
    email: { type: "string", format: "email", example: "user@example.com" },
    username: { type: "string", example: "john_doe" },
    avatar: { type: "string", example: "https://example.com/avatar.jpg" },
    roles: {
      type: "array",
      items: { type: "string", example: "USER" },
    },
  },
};

export const RegisterResponseDTO: OpenAPIV3.SchemaObject = {
  type: "object",
  properties: {
    message: { type: "string", example: "Registration successful" },
    user: { $ref: "#/components/schemas/User" },
  },
};

export const GetAllUsersResponse: OpenAPIV3.SchemaObject = {
  type: "object",
  properties: {
    users: { type: "array", items: { $ref: "#/components/schemas/User" } },
    totalUsers: { type: "integer", example: 100 },
    currentPage: { type: "integer", example: 1 },
    totalPages: { type: "integer", example: 10 },
  },
};

export const GetUserByIdResponse: OpenAPIV3.SchemaObject = {
  type: "object",
  properties: {
    message: { type: "string", example: "User fetched successfully." },
    user: { $ref: "#/components/schemas/User" },
  },
};
