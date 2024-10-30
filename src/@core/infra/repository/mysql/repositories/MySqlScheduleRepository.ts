import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { Schedule } from '../../../../domain/entities/Schedule';
import { ScheduleRepository } from '../../../../domain/repositories/ScheduleRepository';

export class MySqlScheduleRepository implements ScheduleRepository {
  constructor(private readonly repository: any) {}

  async findActiveByDateRange(
    professionalId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Schedule[]> {
    const queryString = `
      SELECT *
      FROM schedules
      WHERE professional_id = '${professionalId}' 
      AND start_date BETWEEN '${startDate.toISOString()}' AND '${endDate.toISOString()}'
      AND deleted_at IS NULL
      ORDER BY start_date ASC
    `;
    const schedulesDatabase = await this.repository.query(queryString);
    return schedulesDatabase.map((schedule: any) =>
      Schedule.fromDatabase(schedule),
    );
  }

  async findById(id: string): Promise<Schedule | null> {
    const queryString = `
      SELECT *
      FROM schedules
      WHERE id = '${id}'
      AND deleted_at IS NULL
    `;
    const result = await this.repository.query(queryString);
    return result.length ? Schedule.fromDatabase(result[0]) : null;
  }

  async findAll(): Promise<Schedule[]> {
    const queryString = `
      SELECT *
      FROM schedules
      WHERE deleted_at IS NULL
    `;
    const schedulesDatabase = await this.repository.query(queryString);
    return schedulesDatabase.map((schedule: any) =>
      Schedule.fromDatabase(schedule),
    );
  }

  async save(schedule: Schedule): Promise<void> {
    await this.repository.save(schedule);
  }

  async update(user: Schedule): Promise<void> {
    if (!user.deletedAt) {
      return this.repository.save(user);
    }
    throw new ErrorHandler('UPDATE ERROR');
  }

  async delete(id: string): Promise<void> {
    const queryString = `
      UPDATE schedules
      SET deleted_at = NOW()
      WHERE id = '${id}'
      AND deleted_at IS NULL
    `;
    await this.repository.query(queryString);
  }

  async findFutureSchedules(userId: string, page: number): Promise<Schedule[]> {
    const offset = page * 20;
    const queryString = `
      SELECT *
      FROM schedules
      WHERE user_id = '${userId}'
      AND status = 'active'
      AND start_date >= CURRENT_DATE()
      AND deleted_at IS NULL
      LIMIT 20
      OFFSET ${offset}
    `;
    const schedulesDatabase = await this.repository.query(queryString);
    return schedulesDatabase.map((schedule: any) =>
      Schedule.fromDatabase(schedule),
    );
  }

  async findPastSchedules(userId: string, page: number): Promise<Schedule[]> {
    const offset = page * 20;
    const queryString = `
      SELECT *
      FROM schedules
      WHERE user_id = '${userId}'
      AND status = 'canceled'
      AND start_date < CURRENT_DATE()
      AND deleted_at IS NULL
      LIMIT 20
      OFFSET ${offset}
    `;
    const schedulesDatabase = await this.repository.query(queryString);
    return schedulesDatabase.map((schedule: any) =>
      Schedule.fromDatabase(schedule),
    );
  }

  async findAllSchedules(userId: string, page: number): Promise<Schedule[]> {
    const offset = page * 20;
    const queryString = `
      SELECT *
      FROM schedules
      WHERE user_id = '${userId}'
      AND deleted_at IS NULL
      LIMIT 20
      OFFSET ${offset}
    `;
    const schedulesDatabase = await this.repository.query(queryString);
    return schedulesDatabase.map((schedule: any) =>
      Schedule.fromDatabase(schedule),
    );
  }

  async findNotificationsToSend(endDate: Date): Promise<Schedule[]> {
    const queryString = `
      SELECT *
      FROM schedules
      WHERE sentRateNotification = '0'
      AND status = 'active'
      AND end_date <= '${endDate.toISOString()}'
      AND block = '0'
      AND deleted_at IS NULL
    `;
    const schedulesDatabase = await this.repository.query(queryString);
    return schedulesDatabase.map((schedule: any) =>
      Schedule.fromDatabase(schedule),
    );
  }

  async deleteByUser(userId: string): Promise<void> {
    const queryString = `
      UPDATE schedules
      SET deleted_at = NOW()
      WHERE user_id = '${userId}'
      AND deleted_at IS NULL
    `;
    await this.repository.query(queryString);
  }
}
