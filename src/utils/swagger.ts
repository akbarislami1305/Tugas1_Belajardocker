import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dokumentasi API Pojok Teduh",
      version: "1.0.0",
      description: "API untuk aplikasi Pojok Teduh",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Local / Docker Server",
      },
      {
        url: "https://capstone-pojokteduh.vercel.app",
        description: "Production Server (Vercel)",
      },
    ],
  },
  apis: [
    path.join(process.cwd(), "dist/src/routes/*.js"),
    path.join(process.cwd(), "dist/routes/*.js"),
    path.join(process.cwd(), "src/routes/*.ts"),
    path.join(process.cwd(), "src/routes/*.js"),
    "./dist/src/routes/*.js",
    "./src/routes/*.ts",
  ], 
};

export const swaggerSpec = swaggerJsdoc(options);