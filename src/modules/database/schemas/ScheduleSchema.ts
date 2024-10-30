import { Schedule } from 'src/@core/domain/entities/Schedule';
import { EntitySchema } from 'typeorm';

const ScheduleSchema = new EntitySchema<Schedule>({
  name: 'Schedule',
  tableName: 'schedules',
  columns: {
    id: {
      type: 'varchar',
      primary: true,
      length: 255,
    },
    userId: {
      name: 'user_id',
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    professionalId: {
      name: 'professional_id',
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    endDate: {
      name: 'end_date',
      type: 'datetime',
      nullable: false,
    },
    startDate: {
      name: 'start_date',
      type: 'datetime',
      nullable: false,
    },
    status: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    block: {
      type: 'boolean',
      nullable: false,
    },
    sentRateNotification: {
      type: 'boolean',
      nullable: false,
    },
    createdAt: {
      name: 'created_at',
      type: 'datetime',
      createDate: true,
      nullable: false,
    },
    updatedAt: {
      name: 'updated_at',
      type: 'datetime',
      updateDate: true,
      nullable: false,
    },
    deletedAt: {
      name: 'deleted_at',
      type: 'datetime',
      nullable: true,
    },
  },
});

export default ScheduleSchema;
