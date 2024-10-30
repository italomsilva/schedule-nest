import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { Service } from '../../../../domain/entities/Service';
import { ServiceRepository } from '../../../../domain/repositories/ServiceRepository';

export class MySqlServiceRepository implements ServiceRepository {
  constructor(private readonly repository: any) {}

  async save(service: Service): Promise<void> {
    await this.repository.save(service);
  }

  async update(service: Service): Promise<void> {
    if (service && !service.deletedAt) {
      return this.repository.save(service);
    } else {
      throw new ErrorHandler('UPDATE ERROR');
    }
  }

  async delete(id: string): Promise<void> {
    const queryString = `
      UPDATE services
      SET deleted_at = NOW()
      WHERE id = '${id}';
    `;
    await this.repository.query(queryString);
  }

  async findByIds(ids: string[]): Promise<Service[]> {
    const queryString = `
      SELECT *
      FROM services
      WHERE id IN (${ids.map((id) => `'${id}'`).join(',')}) AND deleted_at IS NULL;
    `;
    const result = await this.repository.query(queryString);
    return Service.createFromArray(result);
  }

  async findById(id: string): Promise<Service | null> {
    const queryString = `
      SELECT *
      FROM services
      WHERE id = '${id}' AND deleted_at IS NULL;
    `;
    const result = await this.repository.query(queryString);
    return result.length ? Service.fromDatabase(result[0]) : null;
  }

  async findAll(): Promise<Service[]> {
    const queryString = `
      SELECT *
      FROM services
      WHERE deleted_at IS NULL;
    `;
    const result = await this.repository.query(queryString);
    return Service.createFromArray(result);
  }

  async findByName(name: string): Promise<Service | null> {
    const queryString = `
      SELECT *
      FROM services
      WHERE name = '${name}' AND deleted_at IS NULL;
    `;
    const result = await this.repository.query(queryString);
    return result.length ? Service.fromDatabase(result[0]) : null;
  }
}
