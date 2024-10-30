import { Device } from '../../../@core/domain/entities/Device';
import { EntitySchema } from 'typeorm';

const DeviceSchema = new EntitySchema<Device>({
  name: 'Device',
  tableName: 'devices',
  columns: {
    id: {
      type: 'varchar',
      primary: true,
      length: 255,
    },
    deviceId: {
      name: 'device_id',
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    platform: {
      type: 'varchar',
      length: 50,
      nullable: false,
    },
    fcmToken: {
      name: 'fcm_token',
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    buildNumber: {
      name: 'build_number',
      type: 'varchar',
      length: 50,
      nullable: false,
    },
    userId: {
      name: 'user_id',
      type: 'varchar',
      length: 255,
      nullable: true,
    },
    locale: {
      type: 'varchar',
      length: 50,
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

export default DeviceSchema;
