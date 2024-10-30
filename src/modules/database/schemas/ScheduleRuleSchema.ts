import { ScheduleRule } from 'src/@core/domain/entities/ScheduleRule';
import { EntitySchema } from 'typeorm';

const ScheduleRuleSchema = new EntitySchema<ScheduleRule>({
  name: 'ScheduleRule',
  tableName: 'schedule_rules',
  columns: {
    id: {
      type: 'varchar',
      primary: true,
      length: 255,
    },
    professionalId: {
      name: 'professional_id',
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    weekday: {
      type: 'int',
      nullable: false,
    },
    startTime: {
      name: 'start_time',
      type: 'datetime',
    },
    endTime: {
      name: 'end_time',
      type: 'datetime',
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

export default ScheduleRuleSchema;
