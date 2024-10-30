
import { formatSpecialty, SpecialtyOutput } from 'src/@core/application/utils/formatting/formatSpecialty';
import { SpecialtyRepository } from '../../../domain/repositories/SpecialtyRepository';

export class GetSpecialtiesUseCase {
  constructor(private specialtyRepository: SpecialtyRepository) {}
  async execute(): Promise<Output> {
    const specialties = await this.specialtyRepository.findAll();

    return specialties.map((specialty) => formatSpecialty(specialty));
  }
}

type Output = SpecialtyOutput[];
