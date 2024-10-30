import { UUID } from './UUID';

export class Specialty {
  constructor(
    public id: string = UUID.randomUUID(),
    public name: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt: Date | null = null,
  ) {}

  static create(name: string): Specialty {
    const id = UUID.randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();

    return new Specialty(id, name, createdAt, updatedAt);
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

  static fromDatabase(data: any): Specialty {
    return new Specialty(
      data.id,
      data.name,
      new Date(data.created_at),
      new Date(data.updated_at),
      data.deleted_at ? new Date(data.deleted_at) : null,
    );
  }

  update(updatedFields: Partial<Specialty>): void {
    Object.assign(this, updatedFields);
    this.updatedAt = new Date();
  }

  static createFromArray(dataArray: any[]): Specialty[] {
    return dataArray.map((data) => Specialty.fromDatabase(data));
  }
}
