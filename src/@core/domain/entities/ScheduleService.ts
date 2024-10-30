import { UUID } from './UUID';

export class ScheduleService {
  constructor(
    public id: string = UUID.randomUUID(),
    public scheduleId: string,
    public serviceId: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt: Date | null = null,
  ) {}

  static create(scheduleId: string, serviceId: string): ScheduleService {
    const id = UUID.randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();

    return new ScheduleService(id, scheduleId, serviceId, createdAt, updatedAt);
  }

  static createFromArray(data: Array<any>): ScheduleService[] {
    return data.map((scheduleService) =>
      ScheduleService.fromDatabase(scheduleService),
    );
  }

  update(updatedFields: Partial<ScheduleService>): void {
    Object.assign(this, updatedFields);
    this.updatedAt = new Date();
  }

  toDatabase(): any {
    return {
      id: this.id,
      schedule_id: this.scheduleId,
      service_id: this.serviceId,
      created_id: this.createdAt.toISOString(),
      updated_id: this.updatedAt.toISOString(),
      deleted_id: this.deletedAt ? this.deletedAt.toISOString() : null,
    };
  }

  static fromDatabase(data: any): ScheduleService {
    return new ScheduleService(
      data.id,
      data.schedule_id,
      data.service_id,
      new Date(data.created_at),
      new Date(data.updated_at),
      data.deleted_at ? new Date(data.deleted_at) : null,
    );
  }
}
