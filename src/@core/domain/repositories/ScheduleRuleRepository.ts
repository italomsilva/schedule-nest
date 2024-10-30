import { ScheduleRule } from "../entities/ScheduleRule";

export interface ScheduleRuleRepository {
  findById(id: string): Promise<ScheduleRule | null>;
  findAll(): Promise<ScheduleRule[]>;
  save(scheduleRule: ScheduleRule): Promise<void>;
  update(scheduleRule: ScheduleRule): Promise<void>;
  delete(id: string): Promise<void>;
  saveMany(scheduleRules: ScheduleRule[]): Promise<void>;
  findAllByIdProfessional(professionalId: string): Promise<ScheduleRule[]>;
  deleteAllByProfessional(professionalId: string): Promise<void>;


}