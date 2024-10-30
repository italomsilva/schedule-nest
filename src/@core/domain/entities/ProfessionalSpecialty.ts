import { UUID } from './UUID';

export class ProfessionalSpecialty {
  constructor(
    public id: string = UUID.randomUUID(),
    public professionalId: string,
    public specialtyId: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt: Date | null = null,
  ) {}

  static create(data: {
    professionalId: string;
    specialtyId: string;
  }): ProfessionalSpecialty {
    const id = UUID.randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();

    return new ProfessionalSpecialty(
      id,
      data.professionalId,
      data.specialtyId,
      createdAt,
      updatedAt,
    );
  }

  static createFromArray(data: Array<any>): ProfessionalSpecialty[] {
    return data.map((specialtyData) =>
      ProfessionalSpecialty.fromDatabase(specialtyData),
    );
  }

  toDatabase(): any {
    return {
      id: this.id,
      professional_id: this.professionalId,
      specialty_id: this.specialtyId,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
      deleted_at: this.deletedAt ? this.deletedAt.toISOString() : null,
    };
  }

  static fromDatabase(data: any): ProfessionalSpecialty {
    return new ProfessionalSpecialty(
      data.id,
      data.professional_id,
      data.specialty_id,
      new Date(data.created_at),
      new Date(data.updated_at),
      data.deleted_at ? new Date(data.deleted_at) : null,
    );
  }

  update(updatedFields: Partial<ProfessionalSpecialty>): void {
    Object.assign(this, updatedFields);
    this.updatedAt = new Date();
  }
}
