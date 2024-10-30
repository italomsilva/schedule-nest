import { UUID } from './UUID';

export class ScheduleRule {
  constructor(
    public id: string = UUID.randomUUID(),
    public professionalId: string,
    public weekday: number,
    public startTime: string,
    public endTime: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt: Date | null = null,
  ) {}

  static create(
    professionalId: string,
    weekday: number,
    startTime: string,
    endTime: string,
  ): ScheduleRule {
    const id = UUID.randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();

    return new ScheduleRule(
      id,
      professionalId,
      weekday,
      startTime,
      endTime,
      createdAt,
      updatedAt,
    );
  }

  update(updatedFields: Partial<ScheduleRule>): void {
    Object.assign(this, updatedFields);
    this.updatedAt = new Date();
  }

  static createFromArray(
    professionalId: string,
    slots: {
      weekday: number;
      startTime: string;
      endTime: string;
    }[],
  ): ScheduleRule[] {
    return slots.map((slot) =>
      ScheduleRule.create(
        professionalId,
        slot.weekday,
        slot.startTime,
        slot.endTime,
      ),
    );
  }

  toDatabase(): any {
    return {
      id: this.id,
      professional_id: this.professionalId,
      weekday: this.weekday,
      startTime: this.startTime,
      endTime: this.endTime,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
      deleted_at: this.deletedAt ? this.deletedAt.toISOString() : null,
    };
  }

  static fromDatabase(data: any): ScheduleRule {
    return new ScheduleRule(
      data.id,
      data.professional_id,
      data.weekday,
      data.start_time,
      data.end_time,
      new Date(data.created_at),
      new Date(data.updated_at),
      data.deleted_at ? new Date(data.deleted_at) : null,
    );
  }
}
