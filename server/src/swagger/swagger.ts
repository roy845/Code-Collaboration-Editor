import { OpenAPIV3 } from "openapi-types";
import * as schemas from "./schemas";
import { BASE_URL } from "../config/urls";

const swaggerDefinition: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "Code Collaboration Editor API",
    version: "1.0.0",
    description:
      "API for user authentication and authorization and managing rooms,users and roles",
  },
  servers: [
    {
      url: BASE_URL,
    },
  ],
  paths: {},
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      ...schemas.authenticationSchemas,
      ...schemas.userSchemas,
      ...schemas.roomSchemas,
      ...schemas.roleSchemas,
    },
  },
};

export default swaggerDefinition;
