import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ChangePasswordUseCase } from 'src/@core/application/usecases/User/ChangePassword';
import { EditProfileUseCase } from 'src/@core/application/usecases/User/EditProfile';
import { GetUserUseCase } from 'src/@core/application/usecases/User/GetUser';
import { RequestPasswordResetUseCase } from 'src/@core/application/usecases/User/RequestPasswordReset';
import { SetNewPasswordUseCase } from 'src/@core/application/usecases/User/SetNewPassword';
import { SignInUseCase } from 'src/@core/application/usecases/User/SignIn';
import { SignUpUseCase } from 'src/@core/application/usecases/User/Signup';

@Controller()
export class AuthController {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signInUseCase: SignInUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly editProfileUseCase: EditProfileUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
    private readonly requestPasswordResetUseCase: RequestPasswordResetUseCase,
    private readonly setNewPasswordUseCase: SetNewPasswordUseCase,
  ) {}

  @Post('v1-sign-in')
  async signIn(@Body() body, @Res() response: Response): Promise<Response> {
    try {
      const { email, password } = body;
      const output = await this.signInUseCase.execute({ email, password });
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (error: any) {
      console.log(error);
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-sign-up')
  async signUp(@Body() body, @Res() response: Response): Promise<Response> {
    try {
      const { email, password, fullname, document, phone } = body;
      const output = await this.signUpUseCase.execute({
        email,
        password,
        fullname,
        document,
        phone,
      });
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (error: any) {
      console.log(error);
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-get-user')
  async getUser(@Body() body, @Res() response: Response): Promise<Response> {
    try {
      const output = await this.getUserUseCase.execute(body);
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (error: any) {
      console.log(error);
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-edit-profile')
  async editProfile(
    @Body() body,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const output = await this.editProfileUseCase.execute(body);
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (error: any) {
      console.log(error);
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-change-password')
  async changePassword(
    @Body() body,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      await this.changePasswordUseCase.execute(body);
      return response.status(HttpStatus.OK).send();
    } catch (error: any) {
      console.log(error);
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-request-password-reset')
  async requestPasswordReset(
    @Body() body,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      await this.requestPasswordResetUseCase.execute(body);
      return response.status(HttpStatus.OK).send();
    } catch (error: any) {
      console.log(error);
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-set-new-password')
  async SetNewPasswordUseCase(
    @Body() body,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      await this.setNewPasswordUseCase.execute(body);
      return response.status(HttpStatus.OK).send();
    } catch (error: any) {
      console.log(error);
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }
}
