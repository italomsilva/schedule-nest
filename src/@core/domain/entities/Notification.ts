import { UUID } from './UUID';

export class Notification {
  constructor(
    public id: string = UUID.randomUUID(),
    public isRead: boolean = false,
    public userId: string,
    public dynamicNotificationId: string,
    public variables: any,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt: Date | null = null,
  ) {}

  static create(data: CreateNotificationInput): Notification {
    const id = UUID.randomUUID();
    const now = new Date();

    return new Notification(
      id,
      data.isRead,
      data.userId,
      data.dynamicNotificationId,
      data.variables,
      now,
      now,
    );
  }

  static fromDatabase(data: any): Notification {
    return new Notification(
      data.id,
      data.is_read,
      data.user_id,
      data.dynamic_notification_id,
      JSON.parse(data.variables),
      new Date(data.created_at),
      new Date(data.updated_at),
      data.deleted_at ? new Date(data.deleted_at) : null,
    );
  }

  toDatabase(): any {
    return {
      id: this.id,
      is_read: this.isRead,
      user_id: this.userId,
      dynamic_notification_id: this.dynamicNotificationId,
      variables: JSON.stringify(this.variables),
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
      deleted_at: this.deletedAt ? this.deletedAt.toISOString() : null,
    };
  }

  update(updatedFields: Partial<Notification>): void {
    Object.assign(this, updatedFields);
    this.updatedAt = new Date();
  }

  static createFromArray(dataArray: any[]): Notification[] {
    return dataArray.map((data) => Notification.fromDatabase(data));
  }
}

type CreateNotificationInput = {
  isRead: boolean;
  userId: string;
  dynamicNotificationId: string;
  variables: any;
};
