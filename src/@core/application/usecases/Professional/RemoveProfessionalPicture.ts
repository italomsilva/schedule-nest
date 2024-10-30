import {
  ProfessionalOutput,
  formatProfessional,
} from '../../utils/formatting/formatProfessional';
import { ProfessionalRepository } from '../../../domain/repositories/ProfessionalRepository';
import { ProfessionalDependencies } from './ProfessionalDependencies';
import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { ImageRepository } from 'src/@core/domain/repositories/ImageRepository';

export class RemoveProfessionalPictureUseCase {
  constructor(
    private imageRepository: ImageRepository,
    private professionalRepository: ProfessionalRepository,
    private professionalDependencies: ProfessionalDependencies,
  ) {}

  async execute(input: Input): Promise<Output> {
    const professional = await this.professionalRepository.findByOwner(
      input.userId,
    );

    if (!professional) throw new ErrorHandler('INVALID PROFESSIONAL');
    if (professional.profileImageUrl === null) throw new ErrorHandler('IMAGE HAS ALREADY BEEN DELETED');

    await this.imageRepository.delete(professional.profileImageUrl);

    professional.profileImageUrl = null;
    professional.updatedAt = new Date();

    await this.professionalRepository.save(professional);

    const { specialties, services, insurances } =
      await this.professionalDependencies.get(professional);

    return formatProfessional(professional, specialties, services, insurances);
  }
}

type Input = {
  userId: string;
};

type Output = ProfessionalOutput;
