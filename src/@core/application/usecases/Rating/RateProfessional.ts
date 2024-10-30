import { Rating } from 'src/@core/domain/entities/Rating';
import { RatingRepository } from 'src/@core/domain/repositories/RatingRepository';
import { Validator } from 'src/@core/application/utils/validations/Validator';
import {
  formatRating,
  RatingOutput,
} from '../../utils/formatting/formatRating';

export class RateProfessionalUseCase {
  constructor(private ratingRepository: RatingRepository) {}

  async execute(input: Input): Promise<Output> {
    this.validator(input);
    const { professionalId, stars, comments } = input;
    const userId = input.decodedToken.userId;

    const existingRating =
      await this.ratingRepository.findByUserAndProfessional(
        userId,
        professionalId,
      );

    if (existingRating) {
      await this.ratingRepository.delete(existingRating);
    }

    const newRating = Rating.create(userId, professionalId, stars, comments);
    await this.ratingRepository.save(newRating);
    const user = await this.ratingRepository.findUser(newRating);
    return formatRating(newRating, user);
  }

  private validator(input: Input) {
    Validator.requiredFields(
      {
        requireUser: true,
        fields: {
          professionalId: {
            required: true,
          },
          stars: {
            required: true,
          },
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
  professionalId: string;
  stars: number;
  comments?: string;
};

type Output = RatingOutput;
