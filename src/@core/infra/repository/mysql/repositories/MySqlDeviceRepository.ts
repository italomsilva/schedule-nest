import { DeviceRepository } from 'src/@core/domain/repositories/DeviceRepository';
import { Device } from '../../../../domain/entities/Device';

export class MySqlDeviceRepository implements DeviceRepository {
  constructor(private readonly repository: any) {}

  async findByDeviceId(deviceId: string): Promise<Device | null> {
    const query = `
      SELECT *
      FROM devices
      WHERE device_id = ?
      AND deleted_at IS NULL
    `;
    const [result] = await this.repository.query(query, [deviceId]);
    return result ? Device.fromDatabase(result) : null;
  }

  async save(data: Device): Promise<Device> {
    return this.repository.save(data);
  }

  async update(update: Device): Promise<Device> {
    return this.repository.save(update);
  }

  async findDevicesByUserId(userId: string): Promise<Device[]> {
    const query = `
      SELECT *
      FROM devices
      WHERE user_id = ?
      AND deleted_at IS NULL
    `;
    const devices = await this.repository.query(query, [userId]);
    return devices.map((device: any) => Device.fromDatabase(device));
  }

  async deleteByUser(userId: string): Promise<void> {
    const queryString = `
      UPDATE devices
      SET deleted_at = NOW()
      WHERE user_id = '${userId}'
      AND deleted_at IS NULL
    `;
    await this.repository.query(queryString);
  }
}
