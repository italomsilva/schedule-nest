import { Schedule } from '../entities/Schedule';

export interface ScheduleRepository {
  findById(id: string): Promise<Schedule | null>;
  findAll(): Promise<Schedule[]>;
  save(schedule: Schedule): Promise<void>;
  update(schedule: Schedule): Promise<void>;
  delete(id: string): Promise<void>;
  findActiveByDateRange(
    professionalId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Schedule[]>;
  findFutureSchedules(userId: string, page: number): Promise<Schedule[]>;
  findPastSchedules(userId: string, page: number): Promise<Schedule[]>;
  findAllSchedules(userId: string, page: number): Promise<Schedule[]>;
  findNotificationsToSend(endDate: Date): Promise<Schedule[]>;
  deleteByUser(userId: string): Promise<void>;
}
