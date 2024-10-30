import { Device } from '../entities/Device';

export interface DeviceRepository {
  findByDeviceId(deviceId: string): Promise<Device | null>;
  save(data: Device): Promise<Device>;
  update(update: Device): Promise<Device>;
  findDevicesByUserId(userId: string): Promise<Device[]>;
  deleteByUser(userId: string): Promise<void>;
}
