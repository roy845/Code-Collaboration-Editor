import { OpenAPIV3 } from "openapi-types";

export const Room: OpenAPIV3.SchemaObject = {
  type: "object",
  properties: {
    id: { type: "string", example: "63b3e9f6f2a94b1d8e3e4912" },
    name: { type: "string", example: "Room A" },
    language: { type: "string", example: "javascript" },
    code: { type: "string", example: "// Your code here..." },
  },
  required: ["name"],
};

export const GetAllRoomsResponse: OpenAPIV3.SchemaObject = {
  type: "object",
  properties: {
    rooms: { type: "array", items: { $ref: "#/components/schemas/Room" } },
    totalRooms: { type: "integer", example: 100 },
    currentPage: { type: "integer", example: 1 },
    totalPages: { type: "integer", example: 10 },
  },
};

export const GetRoomByIdResponse: OpenAPIV3.SchemaObject = {
  type: "object",
  properties: {
    message: { type: "string", example: "Room fetched successfully." },
    room: { $ref: "#/components/schemas/Room" },
  },
};

export const DeleteRoomResponse: OpenAPIV3.SchemaObject = {
  type: "object",
  properties: {
    message: { type: "string", example: "Room has been deleted successfully." },
  },
};
