import { Professional } from '../entities/Professional';
import { ProfessionalSpecialty } from '../entities/ProfessionalSpecialty';
import { Specialty } from '../entities/Specialty';

export interface ProfessionalSpecialtyRepository {
  findSpecialties(professionalId: string): Promise<Specialty[]>;
  findProfessionals(specialties: string[]): Promise<string[]>;
  save(professionalSpecialty: ProfessionalSpecialty): Promise<void>;
  update(professionalId: string, specialtyIds: string[]): Promise<void>;
}
