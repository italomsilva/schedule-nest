import { Insurance } from "../entities/Insurance";
import { ProfessionalInsurance } from "../entities/ProfessionalInsurance";

export interface ProfessionalInsuranceRepository {
  findInsurances(professionalId: string): Promise<Insurance[]>
  save(ProfessionalInsurance: ProfessionalInsurance): Promise<void>;
  update(professionalId: string, insuranceIds: string[]): Promise<void>
}
