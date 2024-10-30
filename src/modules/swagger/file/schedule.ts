import { security } from './security';

export const requestSchedule = {
  '/v1-get-schedule': {
    post: {
      security,
      summary: 'Buscar Agendamento',
      description:
        'Este recurso permite acessar informações sobre um agendamento.',
      tags: ['Agendamento'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ScheduleRequest',
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
  '/v1-professional-cancel-schedule': {
    post: {
      security,
      summary: 'Cancelamento de agendamento pelo profissional',
      description:
        'Este recurso permite que um profissional cancele um agendamento.',
      tags: ['Agendamento'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ScheduleRequest',
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
  '/v1-get-scheduling-slots': {
    post: {
      security,
      summary: 'Buscar horários disponíveis para agendamento',
      description:
        'Este recurso permite buscar horários disponíveis para agendamento.',
      tags: ['Agendamento'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SchedulingSlotsRequest',
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
  '/v1-get-professional-agenda': {
    post: {
      security,
      summary: 'Buscar Agenda do Profissional',
      description:
        'Este recurso permite buscar os agendamentos ativos de um profissional no período de tempo especificado.',
      tags: ['Agendamento'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ProfessionalAgendaRequest',
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
  '/v1-schedule-services': {
    post: {
      security,
      summary: 'Serviços do agendamento',
      description:
        'Este recurso permite adicionar no agendamento os serviços desejados.',
      tags: ['Agendamento'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ScheduleServicesRequest',
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
  '/v1-cancel-schedule': {
    post: {
      security,
      summary: 'Cancelar agendamento',
      description: 'Este recurso permite ao usuário cancelar um agendamento.',
      tags: ['Agendamento'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ScheduleRequest',
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
  '/v1-get-user-schedules': {
    post: {
      security,
      summary: 'Buscar agendamentos do usuário',
      description:
        'Este recurso permite listar todos os agendamentos do usuário.',
      tags: ['Agendamento'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GetUserSchedulesRequest',
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
  '/v1-reserve-slot': {
    post: {
      security,
      summary: 'Reservar um horário',
      description: 'Este recurso permite reservar um horário de agendamento.',
      tags: ['Agendamento'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ReserveSlotRequest',
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

export const schemasSchedule = {
  ScheduleRequest: {
    type: 'object',
    properties: {
      scheduleId: {
        type: 'string',
        example: '1',
      },
    },
  },
  SchedulingSlotsRequest: {
    type: 'object',
    properties: {
      duration: {
        type: 'integer',
        example: 60, // Exemplo de entrada para duration
      },
      professionalId: {
        type: 'string',
        example: '1', // Exemplo de entrada para professionalId
      },
      startTime: {
        type: 'string',
        example: '2024-05-17T09:00:00Z', // Exemplo de entrada para startTime com formato ISO
      },
      endTime: {
        type: 'string',
        example: '2024-05-17T18:00:00Z', // Exemplo de entrada para endTime com formato ISO
      },
    },
  },
  ProfessionalAgendaRequest: {
    type: 'object',
    properties: {
      professionalId: {
        type: 'string',
        example: '1', // Exemplo de entrada para professionalId
      },
      startDate: {
        type: 'string',
        example: '2024-05-17T00:00:00Z', // Exemplo de entrada para startDate com formato ISO
      },
      endDate: {
        type: 'string',
        example: '2024-05-18T00:00:00Z', // Exemplo de entrada para endDate com formato ISO
      },
    },
  },
  ScheduleServicesRequest: {
    type: 'object',
    properties: {
      professionalId: {
        type: 'string',
        example: '1', // Exemplo de entrada para professionalId
      },
      serviceIds: {
        type: 'array',
        items: {
          type: 'string',
        },
        example: ['1', '2'], // Exemplo de entrada para serviceIds
      },
      startDate: {
        type: 'string',
        example: '2024-05-17T00:00:00Z', // Exemplo de entrada para startDate com formato ISO
      },
      endDate: {
        type: 'string',
        example: '2024-05-18T00:00:00Z', // Exemplo de entrada para endDate com formato ISO
      },
    },
  },
  GetUserSchedulesRequest: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        example: 1, // Exemplo de entrada para page
      },
    },
  },
  ReserveSlotRequest: {
    type: 'object',
    properties: {
      professionalId: {
        type: 'string',
        example: '1', // Exemplo de entrada para professionalId
      },
      startDate: {
        type: 'string',
        example: '2024-05-17T09:00:00Z', // Exemplo de entrada para startDate com formato ISO
      },
      endDate: {
        type: 'string',
        example: '2024-05-17T10:00:00Z', // Exemplo de entrada para endDate com formato ISO
      },
    },
  },
};
