import DeviceSchema from './schemas/DeviceSchema';
import UserSchema from './schemas/UserSchema';
import { DataSource } from 'typeorm';
import DynamicNotificationSchema from './schemas/DynamicNotificationSchema';
import { NotificationSchema } from './schemas/NotificationSchema';
import InsuranceSchema from './schemas/InsuranceSchema';
import ProfessionalInsuranceSchema from './schemas/ProfessionalInsuranceSchema';
import ProfessionalSchema from './schemas/ProfessionalSchema';
import ProfessionalServiceSchema from './schemas/ProfessionalServiceSchema';
import ProfessionalSpecialtySchema from './schemas/ProfessionalSpecialtySchema';
import ScheduleRuleSchema from './schemas/ScheduleRuleSchema';
import ScheduleSchema from './schemas/ScheduleSchema';
import ServiceSchema from './schemas/ServiceSchema';
import SpecialtySchema from './schemas/SpecialtySchema';
import ScheduleServiceSchema from './schemas/ScheduleServiceSchema';
import RatingSchema from './schemas/RatingSchema';

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    DeviceSchema,
    UserSchema,
    NotificationSchema,
    DynamicNotificationSchema,
    InsuranceSchema,
    ProfessionalSchema,
    SpecialtySchema,
    ScheduleSchema,
    ServiceSchema,
    ScheduleRuleSchema,
    ProfessionalInsuranceSchema,
    ProfessionalServiceSchema,
    ProfessionalSpecialtySchema,
    ScheduleServiceSchema,
    RatingSchema
  ],
  synchronize: true,
  logging: false,
  migrations: [],
  subscribers: [],
  legacySpatialSupport: false,
});

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];
