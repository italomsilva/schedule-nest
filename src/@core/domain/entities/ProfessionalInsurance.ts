import { UUID } from './UUID';

export class ProfessionalInsurance {
  constructor(
    public id: string = UUID.randomUUID(),
    public professionalId: string,
    public insuranceId: string,
    public updatedAt: Date = new Date(),
    public deletedAt: Date | null = null,
  ) {}

  static create(data: {
    professionalId: string;
    insuranceId: string;
  }): ProfessionalInsurance {
    return new ProfessionalInsurance(
      UUID.randomUUID(),
      data.professionalId,
      data.insuranceId,
    );
  }

  update(updatedFields: Partial<ProfessionalInsurance>): void {
    Object.assign(this, updatedFields);
    this.updatedAt = new Date();
  }

  toDatabase(): any {
    return {
      id: this.id,
      professional_id: this.professionalId,
      insurance_id: this.insuranceId,
      updated_at: this.updatedAt,
      deleted_at: this.deletedAt ? this.deletedAt.toISOString() : null,
    };
  }

  static fromDatabase(data: any): ProfessionalInsurance {
    return new ProfessionalInsurance(
      data.id,
      data.professionalId,
      data.insuranceId,
      data.updatedAt,
      data.deletedAt ? new Date(data.deletedAt) : null,
    );
  }

  static createFromArray(data: Array<any>): ProfessionalInsurance[] {
    return data.map((insuranceData) =>
      ProfessionalInsurance.fromDatabase(insuranceData),
    );
  }
}
