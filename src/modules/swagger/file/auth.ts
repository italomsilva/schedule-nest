import { security } from './security';

export const requestAuth = {
  '/v1-sign-in': {
    post: {
      security,
      summary: 'Sign in',
      description: 'Authenticate user',
      tags: ['Autenticação'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SignInRequest',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Successful operation',
        },
        400: {
          description: 'Invalid request',
        },
      },
    },
  },
  '/v1-sign-up': {
    post: {
      security,
      summary: 'Sign up',
      description: 'Register new user',
      tags: ['Autenticação'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SignUpRequest',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Successful operation',
        },
        400: {
          description: 'Invalid request',
        },
      },
    },
  },
  '/v1-get-user': {
    post: {
      security,
      summary: 'Buscar usuário',
      description: 'Retrieve user details',
      tags: ['Autenticação'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GetUserRequest',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Successful operation',
        },
        400: {
          description: 'Invalid request',
        },
      },
    },
  },
  '/v1-edit-profile': {
    post: {
      security,
      summary: 'Editar Perfil',
      description: 'Edit user profile',
      tags: ['Autenticação'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/EditProfileRequest',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Successful operation',
        },
        400: {
          description: 'Invalid request',
        },
      },
    },
  },
  '/v1-change-password': {
    post: {
      security,
      summary: 'Mudar senha',
      description: 'Change user password',
      tags: ['Autenticação'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ChangePasswordRequest',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Successful operation',
        },
        400: {
          description: 'Invalid request',
        },
      },
    },
  },
  '/v1-request-password-reset': {
    post: {
      security,
      summary: 'Request password reset',
      description: 'Request password reset for user',
      tags: ['Autenticação'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/RequestPasswordResetRequest',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Successful operation',
        },
        400: {
          description: 'Invalid request',
        },
      },
    },
  },
  '/v1-set-new-password': {
    post: {
      security,
      summary: 'Set new password',
      description: 'Set new password for user',
      tags: ['Autenticação'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SetNewPasswordRequest',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Successful operation',
        },
        400: {
          description: 'Invalid request',
        },
      },
    },
  },
};

export const schemasAuth = {
  SignInRequest: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        example: 'example@email.com',
      },
      password: {
        type: 'string',
        example: 'senha123',
      },
    },
  },
  SignUpRequest: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        example: 'example@email.com',
      },
      password: {
        type: 'string',
        example: '12345678',
      },
      fullname: {
        type: 'string',
        example: 'João Silva',
      },
      document: {
        type: 'string',
        example: '12345678900',
      },
      phone: {
        type: 'string',
        example: '123456789',
      },
    },
  },
  GetUserRequest: {
    type: 'object',
  },
  ChangePasswordRequest: {
    type: 'object',
    properties: {
      currentPassword: {
        type: 'string',
        example: 'senha123', //
      },
      newPassword: {
        type: 'string',
        example: 'novaSenha123',
      },
    },
  },
  RequestPasswordResetRequest: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        example: 'example@email.com',
      },
    },
  },
  SetNewPasswordRequest: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        example: 'example@email.com',
      },
      password: {
        type: 'string',
        example: 'novaSenha123',
      },
      code: {
        type: 'integer',
        example: 123456,
      },
    },
  },
};
