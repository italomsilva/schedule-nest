import { Module } from '@nestjs/common';
import { GetInsurancesUseCase } from 'src/@core/application/usecases/Professional/GetInsurances';
import { GetProfessionalUseCase } from 'src/@core/application/usecases/Professional/GetProfessional';
import { GetProfessionalInternalProfileUseCase } from 'src/@core/application/usecases/Professional/GetProfessionalInternalProfile';
import { GetProfessionalInternalServicesUseCase } from 'src/@core/application/usecases/Professional/GetProfessionalInternalServices';
import { GetProfessionalsUseCase } from 'src/@core/application/usecases/Professional/GetProfessionals';
import { GetSpecialtiesUseCase } from 'src/@core/application/usecases/Professional/GetSpecialties';
import { RemoveProfessionalPictureUseCase } from 'src/@core/application/usecases/Professional/RemoveProfessionalPicture';
import { EditProfessionalUseCase } from 'src/@core/application/usecases/Professional/EditProfessional';
import { ChangeServiceStatusUseCase } from 'src/@core/application/usecases/Service/ChangeServiceStatus';
import { CreateServiceUseCase } from 'src/@core/application/usecases/Service/CreateService';
import { SaveScheduleRuleUseCase } from 'src/@core/application/usecases/SheduleRule/SaveScheduleRule';
import {
  changeServiceStatusUseCase,
  createServiceUseCase,
  getInsurancesUseCase,
  getProfessionalInternalProfileUseCase,
  getProfessionalInternalServicesUseCase,
  getProfessionalsUseCase,
  getProfessionalUseCase,
  getSpecialtiesUseCase,
  removeProfessionalPictureUseCase,
  saveScheduleRuleUseCase,
  editProfessionalUseCase,
  getScheduleUseCase,
  cancelScheduleUseCase,
  getSchedulingSlotsUseCase,
  getProfessionalScheduleUseCase,
  scheduleServicesUseCase,
  getUserSchedulesUseCase,
  getLinkedProfessionalUseCase,
  professionalCancelScheduleUseCase,
  reserveSlotsUseCase,
  getProfessionalRatingsUseCase,
  rateProfessionalUseCase,
  getProfessionalInternalSlotsUseCase,
  setProfessionalPictureUseCase,
} from 'src/@core/di/di';

import { ProfessionalController } from './controllers/ProfessionalController';
import { ServiceController } from './controllers/ServiceController';
import { ScheduleRuleController } from './controllers/SheduleRuleController';
import { ScheduleController } from './controllers/ScheduleController';
import { GetScheduleUseCase } from 'src/@core/application/usecases/Schedule/GetSchedule';
import { CancelScheduleUseCase } from 'src/@core/application/usecases/Schedule/CancelSchedule';
import { GetSchedulingSlotsUseCase } from 'src/@core/application/usecases/Schedule/GetSchedulingSlots';
import { GetProfessionalScheduleUseCase } from 'src/@core/application/usecases/Schedule/GetProfessionalSchedule';
import { ScheduleServicesUseCase } from 'src/@core/application/usecases/Schedule/ScheduleServices';
import { GetUserSchedulesUseCase } from 'src/@core/application/usecases/Schedule/GetUserSchedules';
import { GetLinkedProfessionalUseCase } from 'src/@core/application/usecases/Professional/GetLinkedProfessional';
import { ProfessionalCancelScheduleUseCase } from 'src/@core/application/usecases/Schedule/ProfessionalCancelSchedule';
import { ReserveSlotsUseCase } from 'src/@core/application/usecases/Schedule/ReserveSlot';
import { NotifyProfessionalRateJob } from './jobs/NotifyProfessionalRateJob';
import { ScheduleModule } from '@nestjs/schedule';
import { RatingController } from './controllers/RatingController';
import { GetProfessionalRatingsUseCase } from 'src/@core/application/usecases/Rating/GetProfessionalRatings';
import { RateProfessionalUseCase } from 'src/@core/application/usecases/Rating/RateProfessional';
import { ThrottlerModule } from '@nestjs/throttler';
import { GetProfessionalInternalSlotsUseCase } from 'src/@core/application/usecases/Professional/GetProfessionalInternalSlots';
import { SetProfessionalPictureUseCase } from 'src/@core/application/usecases/Professional/SetProfessionalPicture';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 1,
        limit: 10,
      },
    ]),
  ],
  providers: [
    {
      provide: GetProfessionalUseCase,
      useValue: getProfessionalUseCase,
    },
    {
      provide: GetProfessionalsUseCase,
      useValue: getProfessionalsUseCase,
    },
    {
      provide: EditProfessionalUseCase,
      useValue: editProfessionalUseCase,
    },
    {
      provide: SetProfessionalPictureUseCase,
      useValue: setProfessionalPictureUseCase,
    },
    {
      provide: RemoveProfessionalPictureUseCase,
      useValue: removeProfessionalPictureUseCase,
    },
    {
      provide: GetSpecialtiesUseCase,
      useValue: getSpecialtiesUseCase,
    },
    {
      provide: GetInsurancesUseCase,
      useValue: getInsurancesUseCase,
    },
    {
      provide: GetProfessionalInternalProfileUseCase,
      useValue: getProfessionalInternalProfileUseCase,
    },
    {
      provide: ChangeServiceStatusUseCase,
      useValue: changeServiceStatusUseCase,
    },
    {
      provide: CreateServiceUseCase,
      useValue: createServiceUseCase,
    },
    {
      provide: GetProfessionalInternalServicesUseCase,
      useValue: getProfessionalInternalServicesUseCase,
    },
    {
      provide: SaveScheduleRuleUseCase,
      useValue: saveScheduleRuleUseCase,
    },
    {
      provide: GetScheduleUseCase,
      useValue: getScheduleUseCase,
    },
    {
      provide: CancelScheduleUseCase,
      useValue: cancelScheduleUseCase,
    },
    {
      provide: GetSchedulingSlotsUseCase,
      useValue: getSchedulingSlotsUseCase,
    },
    {
      provide: GetProfessionalScheduleUseCase,
      useValue: getProfessionalScheduleUseCase,
    },
    {
      provide: ScheduleServicesUseCase,
      useValue: scheduleServicesUseCase,
    },
    {
      provide: GetUserSchedulesUseCase,
      useValue: getUserSchedulesUseCase,
    },
    {
      provide: GetLinkedProfessionalUseCase,
      useValue: getLinkedProfessionalUseCase,
    },
    {
      provide: ProfessionalCancelScheduleUseCase,
      useValue: professionalCancelScheduleUseCase,
    },
    {
      provide: ReserveSlotsUseCase,
      useValue: reserveSlotsUseCase,
    },
    {
      provide: GetProfessionalRatingsUseCase,
      useValue: getProfessionalRatingsUseCase,
    },
    {
      provide: RateProfessionalUseCase,
      useValue: rateProfessionalUseCase,
    },
    {
      provide: GetProfessionalInternalSlotsUseCase,
      useValue: getProfessionalInternalSlotsUseCase,
    },

    NotifyProfessionalRateJob,
  ],
  controllers: [
    ProfessionalController,
    ServiceController,
    ScheduleRuleController,
    ScheduleController,
    RatingController,
  ],
})
export class SchedulingModule {}
