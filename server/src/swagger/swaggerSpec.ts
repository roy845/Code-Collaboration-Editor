import swaggerJsdoc from "swagger-jsdoc";
import swaggerDefinition from "./swagger";

const options: swaggerJsdoc.Options = {
  definition: swaggerDefinition,
  apis: ["./src/routes/*.ts"], // Update with the path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
