import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { GetScheduleUseCase } from 'src/@core/application/usecases/Schedule/GetSchedule';
import { CancelScheduleUseCase } from 'src/@core/application/usecases/Schedule/CancelSchedule';
import { GetSchedulingSlotsUseCase } from 'src/@core/application/usecases/Schedule/GetSchedulingSlots';
import { GetProfessionalScheduleUseCase } from 'src/@core/application/usecases/Schedule/GetProfessionalSchedule';
import { ScheduleServicesUseCase } from 'src/@core/application/usecases/Schedule/ScheduleServices';
import { GetUserSchedulesUseCase } from 'src/@core/application/usecases/Schedule/GetUserSchedules';
import { ProfessionalCancelScheduleUseCase } from 'src/@core/application/usecases/Schedule/ProfessionalCancelSchedule';
import { ReserveSlotsUseCase } from 'src/@core/application/usecases/Schedule/ReserveSlot';
import { Response } from 'express';

@Controller()
export class ScheduleController {
  constructor(
    private readonly getScheduleUseCase: GetScheduleUseCase,
    private readonly cancelScheduleUseCase: CancelScheduleUseCase,
    private readonly getSchedulingSlotsUseCase: GetSchedulingSlotsUseCase,
    private readonly getProfessionalScheduleUseCase: GetProfessionalScheduleUseCase,
    private readonly scheduleServicesUseCase: ScheduleServicesUseCase,
    private readonly getUserSchedulesUseCase: GetUserSchedulesUseCase,
    private readonly professionalCancelScheduleUseCase: ProfessionalCancelScheduleUseCase,
    private readonly reserveSlotsUseCase: ReserveSlotsUseCase,
  ) {}

  @Post('v1-get-schedule')
  async getSchedule(@Body() body, @Res() response:Response): Promise<any> {
    try {
      const output = await this.getScheduleUseCase.execute(body);
      return  response.status(HttpStatus.OK).send({ result: output });
    }  catch (error: any) {
      console.log(error);
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-cancel-schedule')
  async cancelSchedule(@Body() body, @Res() response:Response): Promise<any> {
    try {
      const output = await this.cancelScheduleUseCase.execute(body);
      return  response.status(HttpStatus.OK).send({ result: output });
    }  catch (error: any) {
      console.log(error);
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-get-scheduling-slots')
  async getSchedulingSlots(@Body() body, @Res() response:Response): Promise<any> {
    try {
      const output = await this.getSchedulingSlotsUseCase.execute(body);
      return  response.status(HttpStatus.OK).send({ result: output });
    }  catch (error: any) {
      console.log(error);
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-get-professional-agenda')
  async getProfessionalSchedule(@Body() body, @Res() response:Response): Promise<any> {
    try {
      const output = await this.getProfessionalScheduleUseCase.execute(body);
      return  response.status(HttpStatus.OK).send({ result: output });
    }  catch (error: any) {
      console.log(error);
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-schedule-services')
  async scheduleServices(@Body() body, @Res() response:Response): Promise<any> {
    try {
      const output = await this.scheduleServicesUseCase.execute(body);
      return  response.status(HttpStatus.OK).send({ result: output });
    }  catch (error: any) {
      console.log(error);
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-get-user-schedules')
  async getUserSchedules(@Body() body, @Res() response:Response): Promise<any> {
    try {
      const output = await this.getUserSchedulesUseCase.execute(body);
      return  response.status(HttpStatus.OK).send({ result: output });
    }  catch (error: any) {
      console.log(error);
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-professional-cancel-schedule')
  async professionalCancelSchedule(@Body() body, @Res() response:Response): Promise<any> {
    try {
      const output = await this.professionalCancelScheduleUseCase.execute(body);
      return  response.status(HttpStatus.OK).send({ result: output });
    }  catch (error: any) {
      console.log(error);
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-reserve-slot')
  async reserveSlot(@Body() body, @Res() response:Response): Promise<any> {
    try {
      const output = await this.reserveSlotsUseCase.execute(body);
      return  response.status(HttpStatus.OK).send({ result: output });
    }  catch (error: any) {
      console.log(error);
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }
}
