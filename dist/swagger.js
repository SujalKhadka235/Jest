import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "API documentation for Users, Books, and Authors",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: [
        "src/routes/users/user.routes.ts",
        "src/controllers/users/*.ts",
        "src/routes/books/books.routes.ts",
        "src/controllers/books/*.ts",
        "src/routes/authors/authors.routes.ts",
        "src/controllers/authors/*.ts",
        "src/routes/reviews/reviews.routes.ts",
        "src/controllers/reviews/*.ts",
    ],
};
export const swaggerSpec = swaggerJSDoc(options);
export const swaggerUiMiddleware = swaggerUi.serve;
export const swaggerUiHandler = swaggerUi.setup(swaggerSpec);
