// Import required modules
import swaggerJsDoc from "swagger-jsdoc"; // For generating Swagger documentation from JSDoc comments
import swaggerUi from "swagger-ui-express"; // To serve Swagger UI in Express apps
import { Express } from "express"; // Type annotation for the Express app

// Swagger configuration options
const options = {
  definition: {
    openapi: "3.0.0", // OpenAPI version
    info: {
      title: "Task Manager API", // Title of the API
      version: "1.0.0", // Version of your API
    },
  },
  apis: ["./src/routes/*.ts"], // Path to the files where API route documentation comments are located
};

// Generate Swagger specification from options
const specs = swaggerJsDoc(options);

// Function to setup Swagger middleware in the Express app
export const setupSwagger = (app: Express) => {
  // Serve Swagger UI at the /api-docs endpoint
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
