import { security } from './security';

export const requestRating = {
  '/v1-rate-professional': {
    post: {
      security,
      summary: 'Avaliar profissional',
      operationId: 'rateProfessional',
      tags: ['Avaliação'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/RatingRequest',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Successful operation',
        },
      },
    },
  },
  '/v1-get-professional-ratings': {
    post: {
      security,
      summary: 'Buscar avaliações do profissional',
      operationId: 'getProfessionalRatings',
      tags: ['Avaliação'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GetProfessionalRatingsRequest',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Successful operation',
        },
      },
    },
  },
};
