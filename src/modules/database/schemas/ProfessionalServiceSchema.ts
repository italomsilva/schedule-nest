import { ProfessionalService } from 'src/@core/domain/entities/ProfessionalService';
import { EntitySchema } from 'typeorm';

const ProfessionalServiceSchema = new EntitySchema<ProfessionalService>({
  name: 'ProfessionalService',
  tableName: 'professional_services',
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

export default ProfessionalServiceSchema;
