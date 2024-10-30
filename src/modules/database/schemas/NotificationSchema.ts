import { EntitySchema } from 'typeorm';
import { Notification } from '../../../@core/domain/entities/Notification';

export const NotificationSchema = new EntitySchema<Notification>({
  name: 'Notification',
  columns: {
    id: {
      type: 'varchar',
      primary: true,
      nullable: false,
    },
    isRead: {
      type: 'boolean',
      default: false,
      name: 'is_read',
    },
    userId: {
      type: 'varchar',
      name: 'user_id',
    },
    dynamicNotificationId: {
      type: 'varchar',
      name: 'dynamic_notification_id',
    },
    variables: {
      type: 'json',
      nullable: true,
    },
    createdAt: {
      name: 'created_at',
      type: 'datetime',
      createDate: true,
      nullable: false,
    },
    updatedAt: {
      name: 'updated_at',
      type: 'datetime',
      updateDate: true,
      nullable: false,
    },
    deletedAt: {
      name: 'deleted_at',
      type: 'datetime',
      nullable: true,
    },
  },
});
