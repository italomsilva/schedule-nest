import { InsuranceRepository } from '../../../../domain/repositories/InsuranceRepository';
import { ProfessionalInsuranceRepository } from '../../../../domain/repositories/ProfessionalInsuranceRepository';
import { ProfessionalRepository } from '../../../../domain/repositories/ProfessionalRepository';
import { Insurance } from '../../../../domain/entities/Insurance';
import { ProfessionalInsurance } from '../../../../domain/entities/ProfessionalInsurance';
import { Professional } from '../../../../domain/entities/Professional';

export class MySqlProfessionalInsuranceRepository
  implements ProfessionalInsuranceRepository
{
  constructor(
    private repository: any,
    private professionalRepository: ProfessionalRepository,
    private insuranceRepository: InsuranceRepository,
  ) {}

  async findProfessionals(insuranceId: string): Promise<Professional[]> {
    const queryString = `
      SELECT professionalId
      FROM professional_insurances
      WHERE insurance_id = '${insuranceId}'
      AND deleted_at IS NULL
    `;
    const result = await this.repository.query(queryString);
    const professionalIds = result.map((row: any) => row.professionalId);
    return this.professionalRepository.findByIds(professionalIds);
  }

  async findInsurances(professionalId: string): Promise<Insurance[]> {
    const queryString = `
      SELECT insurance_id
      FROM professional_insurances
      WHERE professional_id = '${professionalId}'
      AND deleted_at IS NULL
    `;
    const result = await this.repository.query(queryString);
    const insuranceIds = result.map((row: any) => row.insurance_id);

    if (insuranceIds.length > 0)
      return this.insuranceRepository.findByIds(insuranceIds);
    return [];
  }

  async save(professionalInsurance: ProfessionalInsurance): Promise<void> {
    await this.repository.save(professionalInsurance);
  }

  async delete(professionalId: string, insuranceId: string): Promise<void> {
    const queryString = `
      UPDATE professional_insurances
      SET deleted_at = NOW()
      WHERE professional_id = '${professionalId}'
      AND insurance_id = '${insuranceId}'
      AND deleted_at IS NULL
    `;
    await this.repository.query(queryString);
  }

  async update(professionalId: string, insuranceIds: string[]): Promise<void> {
    // Remover todas as associações anteriores para o profissional
    const deleteQueryString = `
      UPDATE professional_insurances
      SET deleted_at = NOW()
      WHERE professional_id = '${professionalId}
      AND deleted_at IS NULL'
    `;
    await this.repository.query(deleteQueryString);

    // Criar novas associações com os seguros fornecidoson
    const newAssociations = insuranceIds.map((insuranceId) => {
      const result = ProfessionalInsurance.create({
        insuranceId: insuranceId,
        professionalId,
      });
      return result;
    });

    await this.repository.save(newAssociations);
  }
}
