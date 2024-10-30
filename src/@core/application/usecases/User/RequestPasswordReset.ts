import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { UserRepository } from 'src/@core/domain/repositories/UserRepository';
import { SendEmailGateway } from 'src/@core/infra/gateway/SendEmailGateway';
import { Validator } from 'src/@core/application/utils/validations/Validator';
import { User } from 'src/@core/domain/entities/User';

export class RequestPasswordResetUseCase {
  constructor(
    private userRepository: UserRepository,
    private sendEmailGateway: SendEmailGateway,
  ) {}

  async execute(input: Input): Promise<Output> {
    this.validator(input);
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) throw new ErrorHandler('USER NOT FOUND');

    const code = this.getRndInteger(100000, 1000000);
    user.resetPasswordCode = code;
    user.resetPasswordDateTime = new Date();
    user.resetPasswordTries = 0;
    await this.userRepository.update(user);

    await this.sendEmailGateway.sendResetPasswordCode(
      user.fullName,
      user.email,
      code,
    );
  }

  private getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  validator(input: Input) {
    Validator.requiredFields(
      {
        // obs: sem parametros nenhum
        requireUser: false,
        fields: {
          email: {
            required: true,
          },
        },
      },
      input,
    );
  }
}

type Input = {
  email: string;
};

type Output = void;
