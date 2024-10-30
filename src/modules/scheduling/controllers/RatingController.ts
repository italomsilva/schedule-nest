import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { GetProfessionalRatingsUseCase } from 'src/@core/application/usecases/Rating/GetProfessionalRatings';
import { RateProfessionalUseCase } from 'src/@core/application/usecases/Rating/RateProfessional';
import { Response } from 'express';

@Controller()
export class RatingController {
  constructor(
    private readonly getProfessionalRatingsUseCase: GetProfessionalRatingsUseCase,
    private readonly rateProfessionalUseCase: RateProfessionalUseCase,
  ) {}

  @Post('v1-get-professional-ratings')
  async getProfessionalRatings(
    @Body() body: any,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const output = await this.getProfessionalRatingsUseCase.execute(body);
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (error: any) {
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-rate-professional')
  async rateProfessional(
    @Body() body: any,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const output = await this.rateProfessionalUseCase.execute(body);
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (error: any) {
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }
}
