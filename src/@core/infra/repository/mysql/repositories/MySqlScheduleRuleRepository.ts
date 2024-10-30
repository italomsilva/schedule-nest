import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { ScheduleRule } from '../../../../domain/entities/ScheduleRule';
import { ScheduleRuleRepository } from '../../../../domain/repositories/ScheduleRuleRepository';

export class MySqlScheduleRuleRepository implements ScheduleRuleRepository {
  constructor(private readonly repository: any) {}

  async deleteAllByProfessional(professionalId: string): Promise<void> {
    const queryString = `
    DELETE FROM schedule_rules
    WHERE professional_id = '${professionalId}'
  `;
    await this.repository.query(queryString);
  }

  async findById(id: string): Promise<ScheduleRule | null> {
    const queryString = `
      SELECT *
      FROM schedule_rules
      WHERE id = '${id}'
      AND deleted_at IS NULL
    `;
    const result = await this.repository.query(queryString);
    return result.length ? ScheduleRule.fromDatabase(result[0]) : null;
  }

  async findAll(): Promise<ScheduleRule[]> {
    const queryString = `
      SELECT *
      FROM schedule_rules
      WHERE deleted_at IS NULL
    `;
    const result = await this.repository.query(queryString);
    return result.map((scheduleRule: any) =>
      ScheduleRule.fromDatabase(scheduleRule),
    );
  }

  async save(scheduleRule: ScheduleRule): Promise<void> {
    await this.repository.save(scheduleRule);
  }

  async update(scheduleRule: ScheduleRule): Promise<void> {
    if (!scheduleRule.deletedAt) {
      return this.repository.save(scheduleRule);
    }
    throw new ErrorHandler('UPDATE ERROR');
  }

  async delete(id: string): Promise<void> {
    const queryString = `
      UPDATE schedule_rules
      SET deleted_at = NOW()
      WHERE id = '${id}'
      AND deleted_at IS NULL
    `;
    await this.repository.query(queryString);
  }

  async saveMany(scheduleRules: ScheduleRule[]): Promise<void> {
    await this.repository.save(scheduleRules);
  }

  async findAllByIdProfessional(
    professionalId: string,
  ): Promise<ScheduleRule[]> {
    const queryString = `
      SELECT *
      FROM schedule_rules
      WHERE professional_id = '${professionalId}'
      AND deleted_at IS NULL
    `;
    const result = await this.repository.query(queryString);
    return result.map((scheduleRule: any) =>
      ScheduleRule.fromDatabase(scheduleRule),
    );
  }
}
