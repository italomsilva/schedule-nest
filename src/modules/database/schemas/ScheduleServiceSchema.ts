import { EntitySchema } from 'typeorm';
import { ScheduleService } from 'src/@core/domain/entities/ScheduleService';

const ScheduleServiceSchema = new EntitySchema<ScheduleService>({
  name: 'ScheduleService',
  tableName: 'schedule_services',
  columns: {
    id: {
      type: 'varchar',
      primary: true,
      length: 255,
    },
    scheduleId: {
      name: 'schedule_id',
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    serviceId: {
      name: 'service_id',
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    deletedAt: {
      name: 'deleted_at',
      type: 'datetime',
      nullable: true,
    },
  },
});

export default ScheduleServiceSchema;
