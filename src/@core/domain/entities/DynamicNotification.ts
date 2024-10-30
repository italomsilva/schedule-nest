import { UUID } from './UUID';

export class DynamicNotification {
  constructor(
    public id: string = UUID.randomUUID(),
    public keyName: string,
    public title: string,
    public subtitle: string,
    public page: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt: Date | null = null,
  ) {}

  static create(data: CreateDynamicNotificationInput): DynamicNotification {
    const id = UUID.randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();

    return new DynamicNotification(
      id,
      data.keyName,
      data.title,
      data.subtitle,
      data.page,
      createdAt,
      updatedAt,
    );
  }

  static fromDatabase(data: any): DynamicNotification {
    return new DynamicNotification(
      data.id,
      data.key_name,
      data.title,
      data.subtitle,
      data.page,
      new Date(data.created_at),
      new Date(data.updated_at),
      data.deleted_at ? new Date(data.deleted_at) : null,
    );
  }

  toDatabase(): any {
    return {
      id: this.id,
      key_name: this.keyName,
      title: this.title,
      subtitle: this.subtitle,
      page: this.page,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
      deleted_at: this.deletedAt ? this.deletedAt.toISOString() : null,
    };
  }

  update(updatedFields: Partial<DynamicNotification>): void {
    Object.assign(this, updatedFields);
    this.updatedAt = new Date();
  }

  static createFromArray(dataArray: any[]): DynamicNotification[] {
    return dataArray.map((data) => DynamicNotification.fromDatabase(data));
  }
}

type CreateDynamicNotificationInput = {
  keyName: string;
  title: string;
  subtitle: string;
  page: string;
};
