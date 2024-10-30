import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { SaveScheduleRuleUseCase } from 'src/@core/application/usecases/SheduleRule/SaveScheduleRule';
import { Response } from 'express';
@Controller()
export class ScheduleRuleController {
  constructor(
    private readonly saveScheduleRuleUseCase: SaveScheduleRuleUseCase,
  ) {}

  @Post('v1-save-schedule-rule')
  async saveScheduleRule(
    @Body() body: any,
    @Res() response: Response,
  ): Promise<any> {
    try {
      await this.saveScheduleRuleUseCase.execute(body);
      return response.status(HttpStatus.OK).send();
    } catch (error: any) {
      console.log(error);
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }
}
