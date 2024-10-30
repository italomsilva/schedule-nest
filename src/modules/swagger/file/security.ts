import { SecuritySchemeObject, ReferenceObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const security = [
  {
    apiKey: [],
    accessToken: [],
  },
];

export const securitySchemes: Record<string, SecuritySchemeObject | ReferenceObject> =
  {
    apiKey: {
      type: 'apiKey',
      in: 'header',
      name: 'X-Parse-Rest-API-Key',

      description: 'API Key for Parse Server authentication',
    },
    accessToken: {
      type: 'apiKey',
      in: 'header',
      name: 'x-parse-session-token',
      description: 'Access Token for authentication',
    },
  };