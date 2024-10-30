import { ProfessionalSpecialtyRepository } from '../../../../domain/repositories/ProfessionalSpecialtyRepository';
import { SpecialtyRepository } from '../../../../domain/repositories/SpecialtyRepository';
import { ProfessionalSpecialty } from '../../../../domain/entities/ProfessionalSpecialty';
import { Specialty } from '../../../../domain/entities/Specialty';

export class MySqlProfessionalSpecialtyRepository
  implements ProfessionalSpecialtyRepository
{
  constructor(
    private repository: any,
    private specialtyRepository: SpecialtyRepository,
  ) {}

  async save(professionalSpecialty: ProfessionalSpecialty): Promise<void> {
    await this.repository.save(professionalSpecialty);
  }

  async findProfessionals(
    specialties: string[],
  ): Promise<string[]> {
    const queryString = `
      SELECT professional_id from professional_specialties
      WHERE specialty_id IN (${specialties.map((id) => `'${id}'`).join(',')})
      AND deleted_at IS NULL
    `;

    const result = await this.repository.query(queryString);

    if (result.length < 0) return [];

    const professionalIds = result.map((row: any) => row.professional_id);

    return professionalIds;
  }

  async delete(professionalId: string, specialtyId: string): Promise<void> {
    const queryString = `
      UPDATE professional_specialties
      SET deleted_at = NOW()
      WHERE professional_id = '${professionalId}'
      AND specialty_id = '${specialtyId}'
      AND deleted_at IS NULL
    `;
    await this.repository.query(queryString);
  }

  async update(professionalId: string, specialtyIds: string[]): Promise<void> {
    // Remover todas as associações anteriores para o profissional
    const deleteQueryString = `
      UPDATE professional_specialties
      SET deleted_at = NOW()
      WHERE professional_id = '${professionalId}'
      AND deleted_at IS NULL
    `;
    await this.repository.query(deleteQueryString);

    // Criar novas associações com as especialidades fornecidas
    const newAssociations = specialtyIds.map((specialtyId) => {
      return ProfessionalSpecialty.create({
        professionalId,
        specialtyId,
      });
    });

    await this.repository.save(newAssociations);
  }

  async findSpecialties(professionalId: string): Promise<Specialty[]> {
    const queryString = `
      SELECT specialty_id
      FROM professional_specialties
      WHERE professional_id = '${professionalId}'
      AND deleted_at IS NULL
    `;
    const result = await this.repository.query(queryString);
    const specialtyIds = result.map((row: any) => row.specialty_id);
    if (specialtyIds.length > 0)
      return this.specialtyRepository.findByIds(specialtyIds);
    return [];
  }
}
