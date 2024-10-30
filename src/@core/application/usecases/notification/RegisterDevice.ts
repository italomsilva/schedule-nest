import { Device } from 'src/@core/domain/entities/Device';
import { DeviceRepository } from 'src/@core/domain/repositories/DeviceRepository';
import { Validator } from 'src/@core/application/utils/validations/Validator';

export class RegisterDeviceUseCase {
  constructor(private deviceRepository: DeviceRepository) {}

  async execute(input: Input): Promise<Output> {
    this.validator(input);
    const deviceExists: Device = await this.deviceRepository.findByDeviceId(
      input.deviceId,
    );

    if (deviceExists) {
      const updateData = {
        deviceId: input.deviceId,
        platform: input.platform,
        fcmToken: input.fcmToken,
        buildNumber: input.buildNumber,
        userId: input.decodedToken.userId,
        locale: input.locale,
      };

      deviceExists.update(updateData);
      await this.deviceRepository.update(deviceExists);
    } else {
      const device = Device.create({
        userId: input.decodedToken.userId,
        deviceId: input.deviceId,
        platform: input.platform,
        fcmToken: input.fcmToken,
        buildNumber: input.buildNumber,
        locale: input.locale,
      });
      await this.deviceRepository.save(device);
    }
  }

  private validator(input: Input) {
    Validator.requiredFields(
      {
        //obs: sem campos obrigatorios
        requireUser: true,
        fields: {
          deviceId: {
            required: true,
          },
          platform: {
            required: true,
          },
          fcmToken: {
            required: true,
          },
          buildNumber: {
            required: true,
          },
          locale: {
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
  deviceId: string;
  platform: string;
  fcmToken: string;
  buildNumber: string;
  locale: string;
};

type Output = void;
