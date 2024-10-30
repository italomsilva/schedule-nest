import { OpenAPIObject } from '@nestjs/swagger';
import { security, securitySchemes } from './security';
import { requestProfessional, schemasProfessional } from './professional';
import { requestSchedule, schemasSchedule } from './schedule';
import { requestAuth, schemasAuth } from './auth';
import { requestNotification, schemesNotification } from './notification';
import { requestRating } from './rating';

const swaggerDocument: OpenAPIObject = {
  openapi: '3.0.0',
  info: {
    title: 'Sistema de Agendamento',
    description: 'Sistema de Agendamento',
    version: '1.0.0',
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT}`,
      description: 'API server',
    },
  ],
  security,
  paths: {
    ...requestProfessional,
    ...requestSchedule,
    ...requestAuth,
    ...requestNotification,
    ...requestRating,
  },
  components: {
    schemas: {
      ...schemesNotification,
      ...schemasAuth,
      ...schemasProfessional,
      ...schemasSchedule,
    },

    securitySchemes,
  },
};

export { swaggerDocument };
