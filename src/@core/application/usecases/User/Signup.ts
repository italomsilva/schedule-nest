import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { User } from 'src/@core/domain/entities/User';
import { EncryptorGateway } from 'src/@core/domain/gateway/EncryptorGateway';
import { JwtGateway } from 'src/@core/domain/gateway/JwtGateway';
import { UserRepository } from 'src/@core/domain/repositories/UserRepository';
import { formatUser } from 'src/@core/application/utils/formatting/formatUser';
import { Validator } from 'src/@core/application/utils/validations/Validator';

export class SignUpUseCase {
  constructor(
    private userRepository: UserRepository,
    private encryptorGateway: EncryptorGateway,
    private jwtGateway: JwtGateway,
  ) {}

  async execute(input: Input): Promise<Output> {
    this.validator(input);
    const existingUser = await this.userRepository.findByEmail(
      input.email.toLowerCase().trim(),
    );
    if (existingUser) throw new ErrorHandler('EMAIL ALREADY IN USE');

    const hashedPassword = await this.encryptorGateway.encrypt(input.password);

    const newUser = User.create({
      email: input.email.toLowerCase().trim(),
      username: input.email.toLowerCase().trim(),
      password: hashedPassword,
      fullName: input.fullname,
      document: input.document,
      phone: input.phone,
    });
    const sessionToken = await this.jwtGateway.sign({
      userId: newUser.id,
      email: newUser.email,
    });
    newUser.sessionToken = sessionToken;
    newUser.methods = ['email'];

    await this.userRepository.save(newUser);

    return formatUser(newUser);
  }

  validator(input: Input) {
    Validator.requiredFields(
      {
        requireUser: false,
        fields: {
          email: {
            required: true,
          },
          password: {
            required: true,
          },
          fullname: {
            required: true,
          },
          document: {
            required: true,
          },
          phone: {
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
  password: string;
  fullname: string;
  document: string;
  phone: string;
};

type Output = {
  id: string;
  token: string;
  fullname: string;
  document: string;
  phone: string;
  methods: string[];
};
