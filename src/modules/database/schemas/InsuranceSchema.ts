import { Insurance } from 'src/@core/domain/entities/Insurance';
import { EntitySchema } from 'typeorm';

const InsuranceSchema = new EntitySchema<Insurance>({
  name: 'Insurance',
  tableName: 'insurances',
  columns: {
    id: {
      type: 'varchar',
      primary: true,
      length: 255,
    },
    name: {
      type: 'varchar',
      length: 255,
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

export default InsuranceSchema;
