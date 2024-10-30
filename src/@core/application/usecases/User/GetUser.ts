import { ErrorHandler } from "src/@core/domain/entities/ErrorHandler";
import { UserRepository } from "src/@core/domain/repositories/UserRepository";
import { formatUser } from "src/@core/application/utils/formatting/formatUser";
import { Validator } from "src/@core/application/utils/validations/Validator";

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: Input): Promise<Output> {
    this.validator(input);
    const userId = input.decodedToken.userId;
    const user = await this.userRepository.findById(userId);

    if (!user) throw new ErrorHandler('USER NOT FOUND');

    return formatUser(user);
  }

  validator(input: Input) {
    Validator.requiredFields(
      {
        requireUser: true,
        fields: { }
      },
      input,
    );
  }

}
type Input = {
  decodedToken: {
    userId: string;
  };
};

type Output = {
  id: string;
  token: string;
  fullname: string;
  document: string;
  phone: string;
  methods: string[];
};
