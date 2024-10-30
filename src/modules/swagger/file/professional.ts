import { security } from './security';

export const requestProfessional = {
  '/v1-save-schedule-rule': {
    post: {
      summary: 'Salvar as regras de horários de agendamento do profissional',
      description:
        'Recurso que permite salvar as regras de horários de agendamento para cada dia da semana, definindo os períodos de atendimento do profissional e a divisão de tempo para consultas. \n\nNeste exemplo da requisição, na segunda-feira(weekday 1), o profissional trabalha das 9:00 às 18:00 e as consultas podem ser marcadas com intervalos de 30 minutos.',
      tags: ['Profissional'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SaveScheduleRuleRequest',
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
        403: {
          description:
            'Forbidden - INVALID_PROFESSIONAL, INVALID_SLOT_INTERVAL, INVALID_WEEKDAY, INVALID_SLOTS, etc.',
        },
      },
    },
  },
  '/v1-create-service': {
    post: {
      summary: 'Adicionar serviço a ser oferecido',
      description:
        'Recurso que permite que o profissional realize a criação de um serviço prestado por ele.\n\nExemplos:\n- Consulta Médica \n- Hemograma Completo \n- Ressonânssia Magnética',
      tags: ['Profissional'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CreateServiceRequest',
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
        403: {
          description:
            'Forbidden - INVALID_PROFESSIONAL, INVALID_DURATION, INVALID_NAME, etc.',
        },
      },
    },
  },
  '/v1-change-service-status': {
    post: {
      summary: 'Alterar disponibilidade de um serviço',
      description:
        'Recurso que é usado para deixar um serviço disponível ou indisponível.',
      tags: ['Profissional'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ChangeServiceStatusRequest',
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
        403: {
          description:
            'Forbidden - INVALID_PROFESSIONAL, INVALID_SERVICE, etc.',
        },
      },
    },
  },
  '/v1-get-professionals': {
    post: {
      summary: 'Buscar Profissionais',
      description:
        'Recurso que permite listar profissionalis filtrados pela localização e/ou especialidade.',
      tags: ['Profissional'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GetProfessionalsRequest',
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
        403: {
          description: 'Forbidden - INVALID_SPECIALTIES, etc.',
        },
      },
    },
  },
  '/v1-get-professional': {
    post: {
      summary: 'Buscar Profissional',
      description:
        'Recurso que permite listar informações detalhadas de um profissional específico.',
      tags: ['Profissional'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GetProfessionalRequest',
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
        403: {
          description: 'Forbidden - INVALID_PROFESSIONAL_ID, etc.',
        },
      },
    },
  },
  '/v1-get-professional-internal-profile': {
    post: {
      summary: 'Buscar Perfil Interno de um profissional',
      description:
        'Recurso que permite acessar o perfil interno de um profissional específico para fins administrativos ou de gestão interna.',
      tags: ['Profissional'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GetProfessionalInternalProfileRequest',
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
        403: {
          description: 'Forbidden - INVALID_PROFESSIONAL, etc.',
        },
      },
    },
  },
  '/v1-get-professional-internal-services': {
    post: {
      summary: 'Buscar Serviços Internos do Profissional',
      description:
        'Recurso que permite acessar os serviços internos oferecidos por um profissional específico para fins administrativos ou de gestão interna.',
      tags: ['Profissional'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GetProfessionalInternalServicesRequest',
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
        403: {
          description: 'Forbidden - INVALID_PROFESSIONAL, etc.',
        },
      },
    },
  },
  '/v1-get-professional-internal-slots': {
    post: {
      summary: 'Buscar Horários Internos do Profissional',
      description:
        'Recurso que permite acessar os horários internos disponíveis para agendamento com um profissional específico para fins administrativos ou de gestão interna.',
      tags: ['Profissional'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GetProfessionalInternalSlotsRequest',
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
        403: {
          description: 'Forbidden - INVALID_PROFESSIONAL, etc.',
        },
      },
    },
  },
  '/v1-edit-professional': {
    post: {
      summary: 'Editar dados do profissional',
      description: 'Recurso que permite a alteração de dados do profissional.',
      tags: ['Profissional'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/EditProfessionalRequest',
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
        403: {
          description: 'Forbidden - INVALID_PROFESSIONAL, etc.',
        },
      },
    },
  },
  '/v1-get-specialties': {
    post: {
      summary: 'Buscar Especialidades',
      description:
        'Recurso que permite listar as especialidades disponíveis na plataforma.',
      tags: ['Profissional'],
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
  '/v1-get-insurances': {
    post: {
      summary: 'Buscar Seguros ou Planos de Saúde',
      description: 'Recurso que permite listar os convênios da plataforma.',
      tags: ['Profissional'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ProfessionalDefault',
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
  '/v1-get-linked-professional': {
    post: {
      summary: 'Buscar profissional Vinculado a conta',
      description:
        'Recurso que permite acessar o profissional cadastrado que está vinculado a conta de um usuário da plataforma.',
      tags: ['Profissional'],
      responses: {
        200: {
          description: 'Successful operation',
        },
        400: {
          description: 'Invalid request',
        },
        403: {
          description: 'Forbidden - NO_PROFESSIONAL_LINKED, etc.',
        },
      },
    },
  },
  '/v1-set-professional-picture': {
    post: {
      summary: 'Alterar a foto de perfil do profissional',
      description:
        'Recurso que permite alterar a foto de perfil do profissional.',
      tags: ['Profissional'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SetProfessionalPictureRequest',
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
  '/v1-remove-professional-picture': {
    post: {
      summary: 'Remover a foto de perfil do profissional',
      description:
        'Recurso que permite remover a foto de perfil do profissional.',
      tags: ['Profissional'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/RemoveProfessionalPictureRequest',
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

export const schemasProfessional = {
  RatingRequest: {
    type: 'object',
    properties: {
      professionalId: {
        type: 'string',
        example: '1',
      },
      stars: {
        type: 'integer',
        example: 5,
      },
      comments: {
        type: 'string',
        example: 'Excelente serviço!',
      },
    },
    required: ['professionalId', 'stars', 'comments'],
  },
  GetProfessionalRatingsRequest: {
    type: 'object',
    properties: {
      professionalId: {
        type: 'string',
        example: '1',
      },
      limit: {
        type: 'integer',
        example: 10,
      },
      page: {
        type: 'integer',
        example: 0,
      },
    },
    required: ['professionalId', 'limit', 'page'],
  },
  SaveScheduleRuleRequest: {
    type: 'object',
    properties: {
      professionalId: {
        type: 'string',
        example: '1',
      },
      slotInterval: {
        type: 'number',
        example: 30,
      },
      slots: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            weekday: {
              type: 'number',
              example: 1,
            },
            startTime: {
              type: 'string',
              example: '2024-05-17T09:00:00Z',
            },
            endTime: {
              type: 'string',
              example: '2024-05-17T18:00:00Z',
            },
          },
        },
      },
    },
  },
  CreateServiceRequest: {
    type: 'object',
    properties: {
      professionalId: {
        type: 'string',
        example: '1',
      },
      name: {
        type: 'string',
        example: 'Consulta Médica',
      },
      price: {
        type: 'number',
        example: 100,
      },
      duration: {
        type: 'number',
        example: 60,
      },
      available: {
        type: 'boolean',
        example: true,
      },
    },
  },
  ChangeServiceStatusRequest: {
    type: 'object',
    properties: {
      professionalId: {
        type: 'string',
        example: '1',
      },
      serviceId: {
        type: 'string',
        example: '1',
      },
      available: {
        type: 'boolean',
        example: true,
      },
    },
  },
  GetProfessionalRequest: {
    type: 'object',
    properties: {
      professionalId: {
        type: 'string',
        example: '1',
      },
    },
  },
  GetProfessionalInternalProfileRequest: {
    type: 'object',
    properties: {
      professionalId: {
        type: 'string',
        example: '1',
      },
    },
  },
  GetProfessionalInternalServicesRequest: {
    type: 'object',
    properties: {
      professionalId: {
        type: 'string',
        example: '1',
      },
    },
  },
  ProfessionalDefault: {
    type: 'object',
    properties: {
      professionalId: {
        type: 'string',
        example: '1',
      },
    },
  },
  GetProfessionalInternalSlotsRequest: {
    type: 'object',
    properties: {
      professionalId: {
        type: 'string',
        example: '1',
      },
    },
  },
  EditProfessionalRequest: {
    type: 'object',
    properties: {
      professionalId: {
        type: 'string',
        example: '1',
      },
      address: {
        type: 'string',
        example: 'Rua A, 123',
      },
      phone: {
        type: 'string',
        example: '123456789',
      },
      name: {
        type: 'string',
        example: 'Dr. João Silva',
      },
      location: {
        type: 'object',
        properties: {
          latitude: {
            type: 'number',
            example: 40.7128,
          },
          longitude: {
            type: 'number',
            example: -74.006,
          },
        },
      },
      crm: {
        type: 'string',
        example: '123456',
      },
      specialtyIds: {
        type: 'array',
        items: {
          type: 'string',
        },
        example: ['1', '2'],
      },
      insuranceIds: {
        type: 'array',
        items: {
          type: 'string',
        },
        example: ['1', '1'],
      },
      newPicture: {
        type: 'string',
        example: 'image.jpg',
      },
    },
  },
  GetProfessionalsRequest: {
    type: 'object',
    properties: {
      specialties: {
        type: 'array',
        items: {
          type: 'string',
        },
        example: ['1', '2'],
      },
      slat: {
        type: 'number',
        example: 40.7128,
      },
      slong: {
        type: 'number',
        example: -74.006,
      },
      nlat: {
        type: 'number',
        example: 40.7128,
      },
      nlong: {
        type: 'number',
        example: -74.006,
      },
      page: {
        type: 'integer',
        example: 0,
      },
      search: {
        type: 'string',
        example: 'Cardiologia',
      },
    },
  },
  EditProfileRequest: {
    type: 'object',
    properties: {
      phone: {
        type: 'string',
        example: '123456789',
      },
      fullname: {
        type: 'string',
        example: 'João Silva',
      },
      cpf: {
        type: 'string',
        example: '123.456.789-00',
      },
    },
  },
  SetProfessionalPictureRequest: {
    type: 'object',
    properties: {
      userId: {
        type: 'string',
        example: '1',
      },
      base64Image: {
        type: 'string',
        example:
          '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',
      },
      extension: {
        type: 'string',
        example: '.jpg',
      },
    },
  },
  RemoveProfessionalPictureRequest: {
    type: 'object',
    properties: {
      userId: {
        type: 'string',
        example: '1',
      },
    },
  },
};
