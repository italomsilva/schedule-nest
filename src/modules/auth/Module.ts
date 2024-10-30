import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ChangePasswordUseCase } from 'src/@core/application/usecases/User/ChangePassword';
import { EditProfileUseCase } from 'src/@core/application/usecases/User/EditProfile';
import { GetUserUseCase } from 'src/@core/application/usecases/User/GetUser';
import { RequestPasswordResetUseCase } from 'src/@core/application/usecases/User/RequestPasswordReset';
import { SetNewPasswordUseCase } from 'src/@core/application/usecases/User/SetNewPassword';
import { SignInUseCase } from 'src/@core/application/usecases/User/SignIn';
import { SignUpUseCase } from 'src/@core/application/usecases/User/Signup';
import { AuthController } from './controllers/AuthController';
import {
  signInUseCase,
  signUpUseCase,
  getUserUseCase,
  editProfileUseCase,
  changePasswordUseCase,
  requestPasswordResetUseCase,
  setNewPasswordUseCase,
} from 'src/@core/di/di';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 1,
        limit: 10,
      },
    ]),
  ],
  providers: [
    {
      provide: SignInUseCase,
      useValue: signInUseCase,
    },
    {
      provide: SignUpUseCase,
      useValue: signUpUseCase,
    },
    {
      provide: GetUserUseCase,
      useValue: getUserUseCase,
    },
    {
      provide: EditProfileUseCase,
      useValue: editProfileUseCase,
    },
    {
      provide: ChangePasswordUseCase,
      useValue: changePasswordUseCase,
    },
    {
      provide: RequestPasswordResetUseCase,
      useValue: requestPasswordResetUseCase,
    },
    {
      provide: SetNewPasswordUseCase,
      useValue: setNewPasswordUseCase,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
