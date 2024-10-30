import { UUID } from './UUID';

export class Insurance {
  constructor(
    public id: string = UUID.randomUUID(),
    public name: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt: Date | null = null,
  ) {}

  static create(name: string): Insurance {
    const id = UUID.randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();

    return new Insurance(id, name, createdAt, updatedAt);
  }

  toDatabase(): any {
    return {
      id: this.id,
      name: this.name,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
      deleted_at: this.deletedAt ? this.deletedAt.toISOString() : null,
    };
  }

  static fromDatabase(data: any): Insurance {
    return new Insurance(
      data.id,
      data.name,
      new Date(data.created_at),
      new Date(data.updated_at),
      data.deleted_at ? new Date(data.deleted_at) : null,
    );
  }

  update(updatedFields: Partial<Insurance>): void {
    Object.assign(this, updatedFields);
    this.updatedAt = new Date();
  }

  static createFromArray(dataArray: any[]): Insurance[] {
    return dataArray.map((data) => Insurance.fromDatabase(data));
  }
}
