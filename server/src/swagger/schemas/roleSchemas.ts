import { OpenAPIV3 } from "openapi-types";

export const Role: OpenAPIV3.SchemaObject = {
  type: "object",
  properties: {
    id: { type: "string", example: "63b3e9f6f2a94b1d8e3e4912" },
    name: { type: "string", example: "Admin" },
  },
};

export const CreateRoleRequest: OpenAPIV3.SchemaObject = {
  type: "object",
  properties: {
    name: { type: "string", example: "Admin" },
  },
  required: ["name"],
};

export const CreateRoleResponse: OpenAPIV3.SchemaObject = {
  type: "object",
  properties: {
    message: { type: "string", example: "Role created successfully." },
    role: { $ref: "#/components/schemas/Role" },
  },
};

export const GetAllRolesResponse: OpenAPIV3.SchemaObject = {
  type: "object",
  properties: {
    roles: { type: "array", items: { $ref: "#/components/schemas/Role" } },
  },
};

export const GetRoleByIdResponse: OpenAPIV3.SchemaObject = {
  type: "object",
  properties: {
    message: { type: "string", example: "Role fetched successfully." },
    role: { $ref: "#/components/schemas/Role" },
  },
};

export const UpdateRoleRequest: OpenAPIV3.SchemaObject = {
  type: "object",
  properties: {
    name: { type: "string", example: "SuperAdmin" },
  },
  required: ["name"],
};

export const UpdateRoleResponse: OpenAPIV3.SchemaObject = {
  type: "object",
  properties: {
    message: { type: "string", example: "Role updated successfully." },
    role: { $ref: "#/components/schemas/Role" },
  },
};
