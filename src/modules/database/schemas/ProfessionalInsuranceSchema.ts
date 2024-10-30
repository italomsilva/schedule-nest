import { ProfessionalInsurance } from 'src/@core/domain/entities/ProfessionalInsurance';
import { EntitySchema } from 'typeorm';

const ProfessionalInsuranceSchema = new EntitySchema<ProfessionalInsurance>({
  name: 'ProfessionalInsurance',
  tableName: 'professional_insurances',
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
    insuranceId: {
      name: 'insurance_id',
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
  /*
  relations: {
    professionalId: {
      target: 'ProfessionalSchema', // Substitua pelo nome correto da entidade Professional
      type: 'many-to-one',
      joinColumn: { name: 'professional_id' },
    },
    insuranceId: {
      target: 'InsuranceSchema', // Substitua pelo nome correto da entidade Insurance
      type: 'many-to-one',
      joinColumn: { name: 'insurance_id' },
    },
  },*/
});

export default ProfessionalInsuranceSchema;
