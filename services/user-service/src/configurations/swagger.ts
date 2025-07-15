import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import './envVariables';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'REST API documentation for User Service',
    },
    servers: [
      {
        url: process.env.URL || 'http://localhost:3000',
      },
    ],
  },
 apis: [path.resolve(__dirname, '../routes/*.ts')], 
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };