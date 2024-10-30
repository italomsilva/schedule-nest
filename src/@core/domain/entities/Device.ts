import { UUID } from './UUID';

export class Device {
  id: string;
  deviceId: string;
  platform: string;
  fcmToken: string;
  buildNumber: string;
  userId?: string;
  locale?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;

  constructor(deviceData: {
    id: string;
    deviceId: string;
    platform: string;
    fcmToken: string;
    buildNumber: string;
    userId?: string;
    locale?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
  }) {
    this.id = deviceData.id;
    this.deviceId = deviceData.deviceId;
    this.platform = deviceData.platform;
    this.fcmToken = deviceData.fcmToken;
    this.buildNumber = deviceData.buildNumber;
    this.userId = deviceData.userId;
    this.locale = deviceData.locale;
    this.createdAt = deviceData.createdAt;
    this.updatedAt = deviceData.updatedAt;
    this.deletedAt = deviceData.deletedAt;
  }

  static create(deviceData: {
    deviceId: string;
    platform: string;
    fcmToken: string;
    buildNumber: string;
    userId?: string;
    locale?: string;
  }): Device {
    const id = UUID.randomUUID();
    const now = new Date();
    return new Device({
      id,
      deviceId: deviceData.deviceId,
      platform: deviceData.platform,
      fcmToken: deviceData.fcmToken,
      buildNumber: deviceData.buildNumber,
      userId: deviceData.userId,
      locale: deviceData.locale,
      createdAt: now,
      updatedAt: now,
    });
  }

  static fromDatabase(dbDevice: any): Device {
    return new Device({
      id: dbDevice.id,
      deviceId: dbDevice.device_id,
      platform: dbDevice.platform,
      fcmToken: dbDevice.fcm_token,
      buildNumber: dbDevice.build_number,
      userId: dbDevice.user_id,
      locale: dbDevice.locale,
      createdAt: dbDevice.created_at,
      updatedAt: dbDevice.updated_at,
      deletedAt: dbDevice.deleted_at ? new Date(dbDevice.deleted_at) : null,
    });
  }

  toDatabase(): any {
    return {
      id: this.id,
      device_id: this.deviceId,
      platform: this.platform,
      fcmToken: this.fcmToken,
      build_number: this.buildNumber,
      user_id: this.userId,
      locale: this.locale,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      deleted_at: this.deletedAt ? this.deletedAt.toISOString() : null,
    };
  }

  update(updatedFields: Partial<Device>): void {
    Object.assign(this, updatedFields);
    this.updatedAt = new Date();
  }

  static createFromArray(dataArray: any[]): Device[] {
    return dataArray.map((data) => Device.fromDatabase(data));
  }
}
