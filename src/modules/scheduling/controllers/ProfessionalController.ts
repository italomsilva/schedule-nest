import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { SetProfessionalPictureUseCase } from 'src/@core/application/usecases/Professional/SetProfessionalPicture';
import { GetInsurancesUseCase } from 'src/@core/application/usecases/Professional/GetInsurances';
import { GetLinkedProfessionalUseCase } from 'src/@core/application/usecases/Professional/GetLinkedProfessional';
import { GetProfessionalUseCase } from 'src/@core/application/usecases/Professional/GetProfessional';
import { GetProfessionalInternalProfileUseCase } from 'src/@core/application/usecases/Professional/GetProfessionalInternalProfile';
import { GetProfessionalsUseCase } from 'src/@core/application/usecases/Professional/GetProfessionals';
import { GetSpecialtiesUseCase } from 'src/@core/application/usecases/Professional/GetSpecialties';
import { RemoveProfessionalPictureUseCase } from 'src/@core/application/usecases/Professional/RemoveProfessionalPicture';
import { EditProfessionalUseCase } from 'src/@core/application/usecases/Professional/EditProfessional';
import { Response } from 'express';
import { GetProfessionalInternalSlotsUseCase } from 'src/@core/application/usecases/Professional/GetProfessionalInternalSlots';

@Controller()
export class ProfessionalController {
  constructor(
    private readonly getProfessionalUseCase: GetProfessionalUseCase,
    private readonly getProfessionalsUseCase: GetProfessionalsUseCase,
    private readonly editProfessionalUseCase: EditProfessionalUseCase,
    private readonly setProfessionalPictureUseCase: SetProfessionalPictureUseCase,
    private readonly removeProfessionalPictureUseCase: RemoveProfessionalPictureUseCase,
    private readonly getSpecialtiesUseCase: GetSpecialtiesUseCase,
    private readonly getInsurancesUseCase: GetInsurancesUseCase,
    private readonly getProfessionalInternalProfileUseCase: GetProfessionalInternalProfileUseCase,
    private readonly getLinkedProfessionalUseCase: GetLinkedProfessionalUseCase,
    private readonly getProfessionalInternalSlotsUseCase: GetProfessionalInternalSlotsUseCase,
  ) {}

  @Post('v1-get-professional')
  async getProfessional(
    @Body() body: any,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const output = await this.getProfessionalUseCase.execute(body);
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (error: any) {
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-get-professionals')
  async getProfessionals(
    @Body() body: any,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const output = await this. getProfessionalsUseCase.execute(body);
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (error: any) {
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-edit-professional')
  async updateProfessional(
    @Body() body: any,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const output = await this.editProfessionalUseCase.execute(body);
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (error: any) {
      console.log(error);
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-set-professional-picture')
  async changeProfessionalPicture(
    @Body() body: any,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const output = await this.setProfessionalPictureUseCase.execute(body);
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (error: any) {
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-remove-professional-picture')
  async removeProfessionalPicture(
    @Body() body: any,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const output = await this.removeProfessionalPictureUseCase.execute(body);
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (error: any) {
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-get-specialties')
  async getSpecialties(@Res() response: Response): Promise<any> {
    try {
      const output = await this.getSpecialtiesUseCase.execute();
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (error: any) {
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-get-insurances')
  async getInsurances(@Res() response: Response): Promise<any> {
    try {
      const output = await this.getInsurancesUseCase.execute();
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (error: any) {
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-get-professional-internal-profile')
  async getProfessionalInternalProfile(
    @Body() body: any,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const output =
        await this.getProfessionalInternalProfileUseCase.execute(body);
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (error: any) {
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-get-professional-internal-slots')
  async getProfessionalInternalSlots(
    @Body() body: any,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const output =
        await this.getProfessionalInternalSlotsUseCase.execute(body);
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (error: any) {
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-get-linked-professional')
  async getLinkedProfessional(
    @Body() body: any,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const output = await this.getLinkedProfessionalUseCase.execute(body);
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (error: any) {
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }
}
