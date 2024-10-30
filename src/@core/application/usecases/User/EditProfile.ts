import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { UserRepository } from 'src/@core/domain/repositories/UserRepository';
import { formatUser } from 'src/@core/application/utils/formatting/formatUser';
import { Validator } from 'src/@core/application/utils/validations/Validator';

export class EditProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: Input): Promise<Output> {
    this.validator(input);
    const userId = input.decodedToken.userId;
    const user = await this.userRepository.findById(userId);

    if (!user) throw new ErrorHandler('USER NOT FOUND');

    user.fullName = input.fullname;
    user.document = input.cpf;
    user.phone = input.phone;

    const updatedUser = await this.userRepository.update(user);

    return formatUser(updatedUser);
  }

  validator(input: Input) {
    Validator.requiredFields(
      {
        // obs: sem parametros obrigatorios
        requireUser: true,
        fields: {
          phone: {
            required: true,
          },
          fullname: {
            required: true,
          },
          cpf: {
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
  phone: string;
  fullname: string;
  cpf: string;
};

type Output = {
  id: string;
  token: string;
  fullname: string;
  document: string;
  phone: string;
  methods: string[];
};
