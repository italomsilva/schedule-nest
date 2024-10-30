import { ScheduleService } from 'src/@core/domain/entities/ScheduleService';
import { Service } from 'src/@core/domain/entities/Service';
import { ScheduleServiceRepository } from 'src/@core/domain/repositories/ScheduleServiceRepository';
import { ServiceRepository } from 'src/@core/domain/repositories/ServiceRepository';

export class MySqlScheduleServiceRepository
  implements ScheduleServiceRepository
{
  constructor(
    private repository: any,
    private serviceRepository: ServiceRepository,
  ) {}

  async findServices(scheduleId: string): Promise<Service[]> {
    const queryString = `
      SELECT s.id, s.name, s.price, s.duration, s.available, s.created_at, s.updated_at
      FROM services s
      INNER JOIN schedule_services ss ON s.id = ss.service_id
      WHERE ss.schedule_id = '${scheduleId}'
      AND ss.deleted_at IS NULL
    `;
    const result = await this.repository.query(queryString);
    return result.map((row: any) => Service.fromDatabase(row));
  }

  async saveMany(scheduleServices: ScheduleService[]): Promise<void> {
    await this.repository.save(scheduleServices);
  }
  async deleteByUser(userId: string): Promise<void> {
    const queryString = `
      UPDATE schedule_services
      SET deleted_at = NOW()
      WHERE user_id = '${userId}'
      AND deleted_at IS NULL
    `;
    await this.repository.query(queryString);
  }
}
