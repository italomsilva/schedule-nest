import { ScheduleService } from '../entities/ScheduleService';
import { Service } from '../entities/Service';

export interface ScheduleServiceRepository {
  saveMany(scheduleServices: ScheduleService[]): Promise<void>;
  findServices(scheduleId: string): Promise<Service[]>;
  deleteByUser(userId: string): Promise<void>;
}
