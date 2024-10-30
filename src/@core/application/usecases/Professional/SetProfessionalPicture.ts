import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { ImageRepository } from '../../../domain/repositories/ImageRepository';
import { ProfessionalRepository } from '../../../domain/repositories/ProfessionalRepository';
import { ProfessionalOutput, formatProfessional } from './GetProfessional';
import { ProfessionalDependencies } from './ProfessionalDependencies';

export class SetProfessionalPictureUseCase {
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

    const bufferImage = Buffer.from(input.base64Image, 'base64');

    const imageUrl = await this.imageRepository.upload(
      bufferImage,
      process.env.FOLDER_IMAGES,
    );

    if (professional.profileImageUrl != null) {
      await this.imageRepository.delete(professional.profileImageUrl);
    }

    professional.profileImageUrl = imageUrl;
    professional.updatedAt = new Date();

    await this.professionalRepository.save(professional);

    const { specialties, services, insurances } =
      await this.professionalDependencies.get(professional);

    return formatProfessional(professional, specialties, services, insurances);
  }
}

type Input = {
  userId: string;
  base64Image: string;
  extension: string;
};

type Output = ProfessionalOutput;
