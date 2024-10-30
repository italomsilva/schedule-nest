import { Service } from 'src/@core/domain/entities/Service';
import { EntitySchema } from 'typeorm';

const ServiceSchema = new EntitySchema<Service>({
  name: 'Service',
  tableName: 'services',
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
    price: {
      type: 'decimal',
      nullable: false,
    },
    duration: {
      type: 'int',
      nullable: false,
    },
    available: {
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

export default ServiceSchema;
