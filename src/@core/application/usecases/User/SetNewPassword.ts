import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { EncryptorGateway } from 'src/@core/domain/gateway/EncryptorGateway';
import { UserRepository } from 'src/@core/domain/repositories/UserRepository';
import { Validator } from 'src/@core/application/utils/validations/Validator';

export class SetNewPasswordUseCase {
  constructor(
    private userRepository: UserRepository,
    private encryptorGateway: EncryptorGateway,
  ) {}

  async execute(input: Input): Promise<Output> {
    this.validator(input);
    const user = await this.userRepository.findByEmail(input.email);
    const RESET_PASSWORD_MAX_TIME = 1000 * 60 * 60;

    if (!user) throw new ErrorHandler('USER NOT FOUND');

    if (user.resetPasswordCode != input.code || user.resetPasswordTries >= 5) {
      user.resetPasswordTries = user.resetPasswordTries + 1;
      await this.userRepository.update(user);

      if (user.resetPasswordTries >= 5) {
        throw new ErrorHandler('MAX_TRIES_EXCEEDED');
      } else {
        throw new ErrorHandler('INVALID_CODE');
      }
    } else if (
      new Date().getTime() - user.resetPasswordDateTime.getTime() >
      RESET_PASSWORD_MAX_TIME
    ) {
      throw new ErrorHandler('MAX_TIME_EXCEEDED');
    } else {
      const hashedPassword = await this.encryptorGateway.encrypt(
        input.password,
      );
      user.password = hashedPassword;
      user.resetPasswordCode = 0;
      user.resetPasswordDateTime = null;
      user.resetPasswordTries = 0;

      await this.userRepository.update(user);
    }
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
          code: {
            required: true,
          },
          password: {
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
  email: string;
  code: number;
  password: string;
};

type Output = void;
