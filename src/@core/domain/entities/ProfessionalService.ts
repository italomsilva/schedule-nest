import { UUID } from './UUID';

export class ProfessionalService {
  constructor(
    public id: string = UUID.randomUUID(),
    public professionalId: string,
    public serviceId: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt: Date | null = null,
  ) {}

  static create(
    professionalId: string,
    serviceId: string,
  ): ProfessionalService {
    const id = UUID.randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();

    return new ProfessionalService(
      id,
      professionalId,
      serviceId,
      createdAt,
      updatedAt,
    );
  }

  toDatabase(): any {
    return {
      id: this.id,
      professional_id: this.professionalId,
      service_id: this.serviceId,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
      deleted_at: this.deletedAt ? this.deletedAt.toISOString() : null,
    };
  }

  static fromDatabase(data: any): ProfessionalService {
    return new ProfessionalService(
      data.id,
      data.professional_id,
      data.service_id,
      new Date(data.created_at),
      new Date(data.updated_at),
      data.deleted_at ? new Date(data.deleted_at) : null,
    );
  }

  update(updatedFields: Partial<ProfessionalService>): void {
    Object.assign(this, updatedFields);
    this.updatedAt = new Date();
  }

  static createFromArray(data: Array<any>): ProfessionalService[] {
    return data.map((serviceData) =>
      ProfessionalService.fromDatabase(serviceData),
    );
  }
}
