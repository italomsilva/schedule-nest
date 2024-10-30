import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { EncryptorGateway } from 'src/@core/domain/gateway/EncryptorGateway';
import { UserRepository } from 'src/@core/domain/repositories/UserRepository';
import { Validator } from 'src/@core/application/utils/validations/Validator';

export class ChangePasswordUseCase {
  constructor(
    private userRepository: UserRepository,
    private encryptorGateway: EncryptorGateway,
  ) {}

  async execute(input: Input): Promise<Output> {
    this.validator(input);
    const user = await this.userRepository.findByEmail(
      input.decodedToken.email,
    );

    if (!user) throw new ErrorHandler('USER NOT FOUND');

    const isPasswordValid = await this.encryptorGateway.compare(
      user.password,
      input.currentPassword,
    );

    if (!isPasswordValid) throw new ErrorHandler('INVALID USER');

    const hashedPassword = await this.encryptorGateway.encrypt(
      input.newPassword,
    );

    await this.userRepository.updatePassword(
      input.decodedToken.userId,
      hashedPassword,
    );
  }

  validator(input: Input) {
    Validator.requiredFields(
      {
        // obs: sem parametros obrigatorios
        requireUser: true,
        fields: {
          currentPassword: {
            required: true,
          },
          newPassword: {
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
    email: string;
  };
  currentPassword: string;
  newPassword: string;
};

type Output = void;
