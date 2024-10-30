import { ProfessionalSpecialty } from 'src/@core/domain/entities/ProfessionalSpecialty';
import { EntitySchema } from 'typeorm';

const ProfessionalSpecialtySchema = new EntitySchema<ProfessionalSpecialty>({
  name: 'ProfessionalSpecialty',
  tableName: 'professional_specialties',
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
    specialtyId: {
      name: 'specialty_id',
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

export default ProfessionalSpecialtySchema;
