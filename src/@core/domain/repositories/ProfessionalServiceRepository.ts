import { Professional } from "../entities/Professional";
import { ProfessionalService } from "../entities/ProfessionalService";
import { Service } from "../entities/Service";

export interface ProfessionalServiceRepository {
  findProfessionalsByService(
    serviceId: string,
    limit?: number,
    skip?: number
  ): Promise<Professional[]>;

  findServices(professionalId: string): Promise<Service[]>;

  save(professionalService: ProfessionalService): Promise<void>;
}
