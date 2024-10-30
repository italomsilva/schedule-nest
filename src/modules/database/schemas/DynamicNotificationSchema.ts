import { DynamicNotification } from '../../../@core/domain/entities/DynamicNotification';
import { EntitySchema } from 'typeorm';

const DynamicNotificationSchema = new EntitySchema<DynamicNotification>({
  name: 'DynamicNotification',
  tableName: 'dynamic_notification',
  columns: {
    id: {
      type: 'varchar',
      primary: true,
      length: 255,
    },
    keyName: {
      name: 'key_name',
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    title: {
      type: 'text',
      nullable: false,
    },
    subtitle: {
      type: 'text',
      nullable: false,
    },
    page: {
      type: 'text',
      nullable: false,
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

export default DynamicNotificationSchema;
