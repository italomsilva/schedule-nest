import { security } from './security';

export const requestNotification = {
  '/v1-get-notifications': {
    post: {
      security,
      summary: 'Buscar Notificações',
      operationId: 'getNotifications',
      tags: ['Notificação'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GetNotificationsRequest',
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
  '/v1-send-push-notification': {
    post: {
      security,
      summary: 'Enviar notificações',
      operationId: 'sendPushNotification',
      tags: ['Notificação'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/PushNotificationRequest',
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
  '/v1-mark-notification-read': {
    post: {
      security,
      summary: 'Marcar notificações como lidas',
      operationId: 'markNotificationRead',
      tags: ['Notificação'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/MarkNotificationReadRequest',
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
  '/v1-register-device': {
    post: {
      security,
      summary: 'Registrar dispositivo',
      operationId: 'registerDevice',
      tags: ['Notificação'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/RegisterDeviceRequest',
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
  '/v1-count-unread-notifications': {
    post: {
      security,
      summary: 'Contar notificações não lidas',
      operationId: 'countUnreadNotifications',
      tags: ['Notificação'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CountUnreadNotificationsRequest',
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

export const schemesNotification = {
  GetNotificationsRequest: {
    type: 'object',
    properties: {
      isRead: {
        type: 'boolean',
        example: false, // Exemplo de entrada para isRead
      },
      page: {
        type: 'integer',
        example: 0, // Exemplo de entrada para page
      },
    },
    required: ['isRead', 'page'],
  },
  PushNotificationRequest: {
    type: 'object',
    properties: {
      userId: {
        type: 'string',
        example: '1',
      },
      dynamicNotificationKey: {
        type: 'string',
        example: 'key1',
      },
      variables: {
        type: 'object',
        additionalProperties: {
          type: 'string',
        },
        example: {
          key1: 'value1',
        },
      },
    },
    required: ['userId', 'dynamicNotificationKey', 'variables'],
  },
  MarkNotificationReadRequest: {
    type: 'object',
    properties: {
      notificationId: {
        type: 'string',
        example: '1',
      },
    },
    required: ['notificationId'],
  },
  RegisterDeviceRequest: {
    type: 'object',
    properties: {
      deviceId: {
        type: 'string',
        example: '1',
      },
      platform: {
        type: 'string',
        example: 'iOS', // Exemplo de entrada para platform
      },
      fcmToken: {
        type: 'string',
        example: 'fcmToken1', // Exemplo de entrada para fcmToken
      },
      buildNumber: {
        type: 'string',
        example: '1.0.0', // Exemplo de entrada para buildNumber
      },
      locale: {
        type: 'string',
        example: 'en_US', // Exemplo de entrada para locale
      },
    },
    required: ['deviceId', 'platform', 'fcmToken', 'buildNumber', 'locale'],
  },
  CountUnreadNotificationsRequest: {
    type: 'object',
    properties: {},
    required: [],
  },
};
