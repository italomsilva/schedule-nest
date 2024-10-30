import { Specialty } from 'src/@core/domain/entities/Specialty';

export function formatSpecialty(specialty: Specialty): SpecialtyOutput {
  return {
    id: specialty.id,
    name: specialty.name,
  };
}

export type SpecialtyOutput = {
  id: string;
  name: string;
};
