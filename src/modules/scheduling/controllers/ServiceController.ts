import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { GetProfessionalInternalServicesUseCase } from 'src/@core/application/usecases/Professional/GetProfessionalInternalServices';
import { ChangeServiceStatusUseCase } from 'src/@core/application/usecases/Service/ChangeServiceStatus';
import { CreateServiceUseCase } from 'src/@core/application/usecases/Service/CreateService';
import { Response } from 'express';

@Controller()
export class ServiceController {
  constructor(
    private readonly changeServiceStatusUseCase: ChangeServiceStatusUseCase,
    private readonly createServiceUseCase: CreateServiceUseCase,
    private readonly getProfessionalInternalServicesUseCase: GetProfessionalInternalServicesUseCase,
  ) {}

  @Post('v1-change-service-status')
  async changeServiceStatus(
    @Body() body: any,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const output = await this.changeServiceStatusUseCase.execute(body);
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (error: any) {
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-create-service')
  async createService(
    @Body() body: any,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const output = await this.createServiceUseCase.execute(body);
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (error: any) {
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-get-professional-internal-services')
  async getProfessionalInternalServices(
    @Body() body: any,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const output =
        await this.getProfessionalInternalServicesUseCase.execute(body);
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (error: any) {
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }
}
