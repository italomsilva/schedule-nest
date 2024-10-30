import { formatCoordinates } from '../../utils/formatting/formatCoordinates';
import { Professional } from '../../../domain/entities/Professional';
import { ProfessionalInsuranceRepository } from '../../../domain/repositories/ProfessionalInsuranceRepository';
import { ProfessionalRepository } from '../../../domain/repositories/ProfessionalRepository';
import { ProfessionalSpecialtyRepository } from '../../../domain/repositories/ProfessionalSpecialtyRepository';
import { ProfessionalDependencies } from './ProfessionalDependencies';
import {
  formatInternalProfessional,
  ProfessionalInternalOutput,
} from '../../utils/formatting/formatInternalProfessional';
import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { ImageRepository } from 'src/@core/domain/repositories/ImageRepository';
import { Validator } from 'src/@core/application/utils/validations/Validator';

export class EditProfessionalUseCase {
  constructor(
    private professionalRepository: ProfessionalRepository,
    private professionalInsuranceRepository: ProfessionalInsuranceRepository,
    private professionalSpecialtyRepository: ProfessionalSpecialtyRepository,
    private imageRepository: ImageRepository,
    private professionalDependencies: ProfessionalDependencies,
  ) {}

  async execute(input: Input): Promise<Output> {
    this.validator(input);
    let professional: Professional;

    if (input.professionalId) {
      professional = await this.professionalRepository.findById(
        input.professionalId,
      );
      if (professional.ownerId !== input.decodedToken.userId)
        throw new ErrorHandler('INVALID PROFESSIONAL');

      if (!professional) {
        throw new ErrorHandler('PROFESSIONAL NOT FOUND');
      }
    } else {
      professional = Professional.create({
        name: input.name,
        crm: input.crm,
        address: input.address,
        phone: input.phone,
        slotInterval: input.slotInterval,
        location: formatCoordinates(input.location || null),
        ownerId: input.decodedToken.userId,
        profileImageUrl: null,
        visible: true,
      });
    }

    professional.update({
      address: input.address,
      phone: input.phone,
      name: input.name,
      location: formatCoordinates(input.location),
      crm: input.crm,
    });

    await this.professionalInsuranceRepository.update(
      professional.id,
      input.insuranceIds,
    );
    await this.professionalSpecialtyRepository.update(
      professional.id,
      input.specialtyIds,
    );

    if (input.newPicture != null) {
      const imageBuffer = Buffer.from(input.newPicture, 'base64');

      const imageUrl = await this.imageRepository.upload(
        imageBuffer,
        process.env.FOLDER_IMAGES,
      );

      await this.imageRepository.delete(professional.profileImageUrl);
      professional.profileImageUrl = imageUrl;
    }

    const professionalUpdated =
      await this.professionalRepository.save(professional);

    const { specialties, insurances } =
      await this.professionalDependencies.get(professionalUpdated);

    return formatInternalProfessional(
      professionalUpdated,
      specialties,
      insurances,
    );
  }

  private validator(input: Input) {
    Validator.requiredFields(
      {
        requireUser: true,
        fields: {
          address: {
            required: true,
          },
          phone: {
            required: true,
          },
          name: {
            required: true,
          },
          location: {},
          crm: {
            required: true,
          },
          specialtyIds: {
            required: true,
          },
          insuranceIds: {
            required: true,
          },
          newPicture: {},
        },
      },
      input,
    );
  }
}

type Input = {
  decodedToken: {
    userId: string;
  };
  professionalId?: string;
  name: string;
  crm: number;
  address: string;
  phone: string;
  slotInterval: number;
  location: { latitude: number; longitude: number } | null;
  profileImageUrl?: string | null;
  visible?: boolean;
  specialtyIds: string[];
  insuranceIds: string[];
  newPicture?: string; // Alterado para string
};

type Output = ProfessionalInternalOutput;
