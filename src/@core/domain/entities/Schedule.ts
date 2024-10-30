import { UUID } from './UUID';

export class Schedule {
  constructor(
    public id: string = UUID.randomUUID(),
    public userId: string,
    public professionalId: string,
    public endDate: Date,
    public startDate: Date,
    public status: string,
    public block: boolean = false,
    public sentRateNotification: boolean = false,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt: Date | null = null,
  ) {}

  static create(data: {
    userId: string;
    professionalId: string;
    endDate: Date;
    startDate: Date;
    status: string;
    block: boolean;
    sentRateNotification: boolean;
  }): Schedule {
    const id = UUID.randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();

    return new Schedule(
      id,
      data.userId,
      data.professionalId,
      data.endDate,
      data.startDate,
      data.status,
      data.block,
      data.sentRateNotification,
      createdAt,
      updatedAt,
    );
  }

  static createFromArray(data: Array<any>): Schedule[] {
    return data.map((scheduleData) => Schedule.fromDatabase(scheduleData));
  }

  toDatabase(): any {
    return {
      id: this.id,
      user_id: this.userId,
      professional_id: this.professionalId,
      end_date: this.endDate.toISOString(),
      start_date: this.startDate.toISOString(),
      status: this.status,
      block: this.block,
      sent_rate_notification: this.sentRateNotification,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
      deleted_at: this.deletedAt ? this.deletedAt.toISOString() : null,
    };
  }

  static fromDatabase(data: any): Schedule {
    return new Schedule(
      data.id,
      data.user_id,
      data.professional_id,
      new Date(data.end_date),
      new Date(data.start_date),
      data.status,
      !!data.block,
      !!data.sent_rate_notification,
      new Date(data.created_at),
      new Date(data.updated_at),
      data.deleted_at ? new Date(data.deleted_at) : null,
    );
  }

  update(updatedFields: Partial<Schedule>): void {
    Object.assign(this, updatedFields);
    this.updatedAt = new Date();
  }
}
