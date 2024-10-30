import { UUID } from './UUID';

export class Service {
  constructor(
    public id: string = UUID.randomUUID(),
    public name: string,
    public price: number,
    public duration: number,
    public available: boolean,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt: Date | null = null,
  ) {}

  static create(
    name: string,
    price: number,
    duration: number,
    available: boolean =  true,
  ): Service {
    return new Service(UUID.randomUUID(), name, price, duration, available);
  }

  toDatabase(): any {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      duration: this.duration,
      available: this.available,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
      deleted_at: this.deletedAt ? this.deletedAt.toISOString() : null,
    };
  }

  static fromDatabase(data: any): Service {
    return new Service(
      data.id,
      data.name,
      Number(data.price),
      data.duration,
      !!data.available,
      new Date(data.created_at),
      new Date(data.updated_at),
      data.deleted_at ? new Date(data.deleted_at) : null,
    );
  }

  update(updatedFields: Partial<Service>): void {
    Object.assign(this, updatedFields);
    this.updatedAt = new Date();
  }

  static createFromArray(dataArray: any[]): Service[] {
    return dataArray.map((data) => this.fromDatabase(data));
  }
}
