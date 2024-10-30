import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { EncryptorGateway } from 'src/@core/domain/gateway/EncryptorGateway';
import { JwtGateway } from 'src/@core/domain/gateway/JwtGateway';
import { UserRepository } from 'src/@core/domain/repositories/UserRepository';
import { formatUser } from 'src/@core/application/utils/formatting/formatUser';
import { Validator } from 'src/@core/application/utils/validations/Validator';

export class SignInUseCase {
  constructor(
    private userRepository: UserRepository,
    private encryptorGateway: EncryptorGateway,
    private jwtGateway: JwtGateway,
  ) {}

  async execute(input: Input): Promise<Output> {
    this.validator(input);
    const { email, password } = input;

    const formattedEmail = email.toLowerCase().trim();
    const user = await this.userRepository.findByEmail(formattedEmail);

    if (!user) throw new ErrorHandler('USER NOT FOUND', 401);

    const isPasswordValid = await this.encryptorGateway.compare(
      user.password,
      password,
    );

    if (!isPasswordValid) throw new ErrorHandler('INVALID EMAIL OR PASSWORD', 401);

    const payload = { userId: user.id, email: user.email };
    const accessToken = await this.jwtGateway.sign(payload);

    if (!accessToken) throw new ErrorHandler('FAILED TO GENERATE ACESS TOKEN', 401);

    user.sessionToken = accessToken;

    return formatUser(user);
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
        },
      },
      input,
    );
  }
}

type Input = {
  email: string;
  password: string;
};

type Output = {
  id: string;
  token: string;
  fullname: string;
  document: string;
  phone: string;
  methods: string[];
};
