import { ProfessionalRepository } from '../../../../domain/repositories/ProfessionalRepository';
import { ProfessionalServiceRepository } from '../../../../domain/repositories/ProfessionalServiceRepository';
import { ServiceRepository } from '../../../../domain/repositories/ServiceRepository';
import { Professional } from '../../../../domain/entities/Professional';
import { ProfessionalService } from '../../../../domain/entities/ProfessionalService';
import { Service } from '../../../../domain/entities/Service';

export class MySqlProfessionalServiceRepository
  implements ProfessionalServiceRepository
{
  constructor(
    private repository: any,
    private professionalRepository: ProfessionalRepository,
    private serviceRepository: ServiceRepository,
  ) {}

  async findProfessionalsByService(
    serviceId: string,
    limit?: number,
    skip?: number,
  ): Promise<Professional[]> {
    const queryString = `
      SELECT professional_id
      FROM professional_services
      WHERE service_id = '${serviceId}'
      AND deleted_at IS NULL
      LIMIT ${limit || -1}
      OFFSET ${skip || 0}
    `;
    const result = await this.repository.query(queryString);
    const professionalIdsWithService = result.map(
      (row: any) => row.professional_id,
    );
    return this.professionalRepository.findByIds(professionalIdsWithService);
  }

  async findServices(professionalId: string): Promise<Service[]> {
    const queryString = `
      SELECT service_id
      FROM professional_services
      WHERE professional_id = '${professionalId}'
      AND deleted_at IS NULL
    `;
    const result = await this.repository.query(queryString);
    const serviceIds = result.map((row: any) => row.service_id);
    if (serviceIds.length > 0)
      return this.serviceRepository.findByIds(serviceIds);
    return [];
  }

  async save(professionalService: ProfessionalService): Promise<void> {
    await this.repository.save(professionalService);
  }

  async update(professionalId: string, serviceIds: string[]): Promise<void> {
    // Remover todas as associações anteriores para o profissional
    const deleteQueryString = `
      UPDATE professional_services
      SET deleted_at = NOW()
      WHERE professional_id = '${professionalId}'
      AND deleted_at IS NULL
      '
    `;
    await this.repository.query(deleteQueryString);

    // Criar novas associações com os serviços fornecidos
    const newAssociations = serviceIds.map((serviceId) => {
      return ProfessionalService.create(professionalId, serviceId);
    });

    await this.repository.save(newAssociations);
  }
}
