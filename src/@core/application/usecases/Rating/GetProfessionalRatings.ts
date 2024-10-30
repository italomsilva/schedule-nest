import { RatingRepository } from "src/@core/domain/repositories/RatingRepository";
import { Validator } from "src/@core/application/utils/validations/Validator";
import { formatRating, RatingOutput } from "../../utils/formatting/formatRating";

export class GetProfessionalRatingsUseCase {
  constructor(private ratingRepository: RatingRepository) {}

  async execute(input: Input): Promise<Output> {
    this.validator(input);
    const { professionalId, limit, page } = input;
    const ratings = await this.ratingRepository.findByProfessional(
      professionalId,
      limit,
      page,
    );

    const ratingPromises = ratings.map(async (rating) => {
      const user = await this.ratingRepository.findUser(rating);
      return formatRating(rating, user);
    });

    return Promise.all(ratingPromises);
  }

  private validator(input: Input) {
    Validator.requiredFields(
      {
        requireUser: false,
        fields: {
          professionalId: {
            required: true,
          },
          limit: {
            required: true,
          },
          page: {
            required: true,
          },
        },
      },
      input,
    );
  }
}

type Input = {
  professionalId: string;
  limit: number;
  page: number;
};

type Output = RatingOutput[];
