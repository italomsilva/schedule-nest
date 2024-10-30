import { dataSource } from 'src/modules/database/database';
import DeviceSchema from 'src/modules/database/schemas/DeviceSchema';
import InsuranceSchema from 'src/modules/database/schemas/InsuranceSchema';
import { NotificationSchema } from 'src/modules/database/schemas/NotificationSchema';
import ProfessionalInsuranceSchema from 'src/modules/database/schemas/ProfessionalInsuranceSchema';
import ProfessionalSchema from 'src/modules/database/schemas/ProfessionalSchema';
import ProfessionalServiceSchema from 'src/modules/database/schemas/ProfessionalServiceSchema';
import ProfessionalSpecialtySchema from 'src/modules/database/schemas/ProfessionalSpecialtySchema';
import RatingSchema from 'src/modules/database/schemas/RatingSchema';
import ScheduleRuleSchema from 'src/modules/database/schemas/ScheduleRuleSchema';
import ScheduleSchema from 'src/modules/database/schemas/ScheduleSchema';
import ScheduleServiceSchema from 'src/modules/database/schemas/ScheduleServiceSchema';
import ServiceSchema from 'src/modules/database/schemas/ServiceSchema';
import SpecialtySchema from 'src/modules/database/schemas/SpecialtySchema';
import UserSchema from 'src/modules/database/schemas/UserSchema';
import { CryptoEncryptorGateway } from '../infra/gateway/CryptoEncryptorGateway';
import { JsonwebtokenGateway } from '../infra/gateway/JsonwebtokenGateway';
import { SendEmailGateway } from '../infra/gateway/SendEmailGateway';
import { S3Repository } from '../infra/repository/aws/S3Repository';
import { MySqlDeviceRepository } from '../infra/repository/mysql/repositories/MySqlDeviceRepository';
import { MySqlNotificationRepository } from '../infra/repository/mysql/repositories/MySqlNotificationRepository';
import { MySqlProfessionalInsuranceRepository } from '../infra/repository/mysql/repositories/MySqlProfessionalInsuranceRepository';
import { MySqlProfessionalRepository } from '../infra/repository/mysql/repositories/MySqlProfessionalRepository';
import { MySqlProfessionalServiceRepository } from '../infra/repository/mysql/repositories/MySqlProfessionalServiceRepository';
import { MySqlProfessionalSpecialtyRepository } from '../infra/repository/mysql/repositories/MySqlProfessionalSpecialtyRepository';
import { MySqlRatingRepository } from '../infra/repository/mysql/repositories/MySqlRatingRepository';
import { MySqlScheduleRepository } from '../infra/repository/mysql/repositories/MySqlScheduleRepository';
import { MySqlScheduleRuleRepository } from '../infra/repository/mysql/repositories/MySqlScheduleRuleRepository';
import { MySqlScheduleServiceRepository } from '../infra/repository/mysql/repositories/MySqlScheduleServiceRepository';
import { MySqlServiceRepository } from '../infra/repository/mysql/repositories/MySqlServiceRepository';
import { MySqlSpecialtyRepository } from '../infra/repository/mysql/repositories/MySqlSpecialtyRepository';
import { MySqlUserRepository } from '../infra/repository/mysql/repositories/MySqlUserRepository';
import { FirebaseNotificationGateway } from '../infra/gateway/FirebaseNotificationGateway';
import { EditProfessionalUseCase } from '../application/usecases/Professional/EditProfessional';
import { GetInsurancesUseCase } from '../application/usecases/Professional/GetInsurances';
import { GetLinkedProfessionalUseCase } from '../application/usecases/Professional/GetLinkedProfessional';
import { GetProfessionalUseCase } from '../application/usecases/Professional/GetProfessional';
import { GetProfessionalInternalProfileUseCase } from '../application/usecases/Professional/GetProfessionalInternalProfile';
import { GetProfessionalInternalServicesUseCase } from '../application/usecases/Professional/GetProfessionalInternalServices';
import { GetProfessionalInternalSlotsUseCase } from '../application/usecases/Professional/GetProfessionalInternalSlots';
import { GetProfessionalsUseCase } from '../application/usecases/Professional/GetProfessionals';
import { GetSpecialtiesUseCase } from '../application/usecases/Professional/GetSpecialties';
import { ProfessionalDependencies } from '../application/usecases/Professional/ProfessionalDependencies';
import { RemoveProfessionalPictureUseCase } from '../application/usecases/Professional/RemoveProfessionalPicture';
import { SetProfessionalPictureUseCase } from '../application/usecases/Professional/SetProfessionalPicture';
import { GetProfessionalRatingsUseCase } from '../application/usecases/Rating/GetProfessionalRatings';
import { RateProfessionalUseCase } from '../application/usecases/Rating/RateProfessional';
import { CancelScheduleUseCase } from '../application/usecases/Schedule/CancelSchedule';
import { GetAvailableSlots } from '../application/usecases/Schedule/GetAvailableSlots';
import { GetProfessionalScheduleUseCase } from '../application/usecases/Schedule/GetProfessionalSchedule';
import { GetScheduleUseCase } from '../application/usecases/Schedule/GetSchedule';
import { GetSchedulingSlotsUseCase } from '../application/usecases/Schedule/GetSchedulingSlots';
import { GetUserSchedulesUseCase } from '../application/usecases/Schedule/GetUserSchedules';
import { ProfessionalCancelScheduleUseCase } from '../application/usecases/Schedule/ProfessionalCancelSchedule';
import { ReserveSlotsUseCase } from '../application/usecases/Schedule/ReserveSlot';
import { ScheduleDependencies } from '../application/usecases/Schedule/ScheduleDependencies';
import { ScheduleServicesUseCase } from '../application/usecases/Schedule/ScheduleServices';
import { SendRateProfessionalNotificationUseCase } from '../application/usecases/Schedule/SendRateProfessionalNotification';
import { ChangeServiceStatusUseCase } from '../application/usecases/Service/ChangeServiceStatus';
import { CreateServiceUseCase } from '../application/usecases/Service/CreateService';
import { SaveScheduleRuleUseCase } from '../application/usecases/SheduleRule/SaveScheduleRule';
import { ChangePasswordUseCase } from '../application/usecases/User/ChangePassword';
import { EditProfileUseCase } from '../application/usecases/User/EditProfile';
import { GetUserUseCase } from '../application/usecases/User/GetUser';
import { RequestPasswordResetUseCase } from '../application/usecases/User/RequestPasswordReset';
import { SetNewPasswordUseCase } from '../application/usecases/User/SetNewPassword';
import { SignInUseCase } from '../application/usecases/User/SignIn';
import { SignUpUseCase } from '../application/usecases/User/Signup';
import { CountUnreadNotificationsUseCase } from '../application/usecases/notification/CountUnreadNotifications';
import { GetNotificationsUseCase } from '../application/usecases/notification/GetNotifications';
import { MarkNotificationReadUseCase } from '../application/usecases/notification/MarkNotificationRead';
import { RegisterDeviceUseCase } from '../application/usecases/notification/RegisterDevice';
import { SendPushNotificationUseCase } from '../application/usecases/notification/SendPushNotification';
import { MySqlInsuranceRepository } from '../infra/repository/mysql/repositories/MySqlInsutanceRepository';

const mysqlScheduleRepository = new MySqlScheduleRepository(
  dataSource.getRepository(ScheduleSchema),
);
const mysqlScheduleRuleRepository = new MySqlScheduleRuleRepository(
  dataSource.getRepository(ScheduleRuleSchema),
);
const imageRepository = new S3Repository();
const mysqlSpecialtyRepository = new MySqlSpecialtyRepository(
  dataSource.getRepository(SpecialtySchema),
);
const mysqlServiceRepository = new MySqlServiceRepository(
  dataSource.getRepository(ServiceSchema),
);
const mysqlInsuranceRepository = new MySqlInsuranceRepository(
  dataSource.getRepository(InsuranceSchema),
);

const mysqlUserRepository = new MySqlUserRepository(
  dataSource.getRepository(UserSchema),
);

const mysqlProfessionalSpecialtyRepository =
  new MySqlProfessionalSpecialtyRepository(
    dataSource.getRepository(ProfessionalSpecialtySchema),
    mysqlSpecialtyRepository,
  );

const mysqlProfessionalRepository = new MySqlProfessionalRepository(
  dataSource.getRepository(ProfessionalSchema),
  mysqlProfessionalSpecialtyRepository,
);

const mysqlProfessionalServiceRepository =
  new MySqlProfessionalServiceRepository(
    dataSource.getRepository(ProfessionalServiceSchema),
    mysqlProfessionalRepository,
    mysqlServiceRepository,
  );

const mysqlProfessionalInsuranceRepository =
  new MySqlProfessionalInsuranceRepository(
    dataSource.getRepository(ProfessionalInsuranceSchema),
    mysqlProfessionalRepository,
    mysqlInsuranceRepository,
  );
const mysqlScheduleServiceRepository = new MySqlScheduleServiceRepository(
  dataSource.getRepository(ScheduleServiceSchema),
  mysqlServiceRepository,
);
const mysqlRatingRepository = new MySqlRatingRepository(
  dataSource.getRepository(RatingSchema),
);
const mysqlDeviceRepository = new MySqlDeviceRepository(
  dataSource.getRepository(DeviceSchema),
);
const mysqlNotificationRepository = new MySqlNotificationRepository(
  dataSource.getRepository(NotificationSchema),
);

// Instanciando os gateways
const cryptoEncryptorGateway = new CryptoEncryptorGateway();
const jsonwebtokenGateway = new JsonwebtokenGateway();
const sendEmailGateway = new SendEmailGateway();
const firebaseNotificationGateway = new FirebaseNotificationGateway();

// Casos de uso
const signInUseCase = new SignInUseCase(
  mysqlUserRepository,
  cryptoEncryptorGateway,
  jsonwebtokenGateway,
);

const signUpUseCase = new SignUpUseCase(
  mysqlUserRepository,
  cryptoEncryptorGateway,
  jsonwebtokenGateway,
);

const getUserUseCase = new GetUserUseCase(mysqlUserRepository);

const editProfileUseCase = new EditProfileUseCase(mysqlUserRepository);

const changePasswordUseCase = new ChangePasswordUseCase(
  mysqlUserRepository,
  cryptoEncryptorGateway,
);

const requestPasswordResetUseCase = new RequestPasswordResetUseCase(
  mysqlUserRepository,
  sendEmailGateway,
);

const setNewPasswordUseCase = new SetNewPasswordUseCase(
  mysqlUserRepository,
  cryptoEncryptorGateway,
);

const registerDeviceUseCase = new RegisterDeviceUseCase(mysqlDeviceRepository);
const getNotificationsUseCase = new GetNotificationsUseCase(
  mysqlNotificationRepository,
);
const countUnreadNotificationsUseCase = new CountUnreadNotificationsUseCase(
  mysqlNotificationRepository,
);
const markNotificationReadUseCase = new MarkNotificationReadUseCase(
  mysqlNotificationRepository,
);

const changeServiceStatusUseCase = new ChangeServiceStatusUseCase(
  mysqlServiceRepository,
  mysqlProfessionalRepository,
  mysqlProfessionalServiceRepository,
);

const saveScheduleRuleUseCase = new SaveScheduleRuleUseCase(
  mysqlProfessionalRepository,
  mysqlScheduleRuleRepository,
);
const createServiceUseCase = new CreateServiceUseCase(
  mysqlProfessionalRepository,
  mysqlServiceRepository,
  mysqlProfessionalServiceRepository,
);
const professionalDependencies = new ProfessionalDependencies(
  mysqlProfessionalSpecialtyRepository,
  mysqlProfessionalServiceRepository,
  mysqlProfessionalInsuranceRepository,
);

const scheduleDependencies = new ScheduleDependencies(
  mysqlUserRepository,
  mysqlScheduleServiceRepository,
  mysqlProfessionalRepository,
  professionalDependencies,
);
const getProfessionalsUseCase = new GetProfessionalsUseCase(
  mysqlProfessionalRepository,
  professionalDependencies,
);
const getProfessionalUseCase = new GetProfessionalUseCase(
  mysqlProfessionalRepository,
  professionalDependencies,
);
const editProfessionalUseCase = new EditProfessionalUseCase(
  mysqlProfessionalRepository,
  mysqlProfessionalInsuranceRepository,
  mysqlProfessionalSpecialtyRepository,
  imageRepository,
  professionalDependencies,
);
const setProfessionalPictureUseCase = new SetProfessionalPictureUseCase(
  imageRepository,
  mysqlProfessionalRepository,
  professionalDependencies,
);

const removeProfessionalPictureUseCase = new RemoveProfessionalPictureUseCase(
  imageRepository,
  mysqlProfessionalRepository,
  professionalDependencies,
);

const getSpecialtiesUseCase = new GetSpecialtiesUseCase(
  mysqlSpecialtyRepository,
);
const getInsurancesUseCase = new GetInsurancesUseCase(mysqlInsuranceRepository);

const getProfessionalInternalProfileUseCase =
  new GetProfessionalInternalProfileUseCase(
    mysqlProfessionalRepository,
    professionalDependencies,
  );

const getProfessionalInternalServicesUseCase =
  new GetProfessionalInternalServicesUseCase(
    mysqlProfessionalRepository,
    professionalDependencies,
  );

const getProfessionalInternalSlotsUseCase =
  new GetProfessionalInternalSlotsUseCase(
    mysqlProfessionalRepository,
    mysqlScheduleRuleRepository,
  );

const getScheduleUseCase = new GetScheduleUseCase(
  mysqlScheduleRepository,
  scheduleDependencies,
);

const cancelScheduleUseCase = new CancelScheduleUseCase(
  mysqlScheduleRepository,
  scheduleDependencies,
);

const getAvailableSlots = new GetAvailableSlots(
  mysqlScheduleRepository,
  mysqlProfessionalRepository,
  mysqlScheduleRuleRepository,
);

const getSchedulingSlotsUseCase = new GetSchedulingSlotsUseCase(
  getAvailableSlots,
);

const getProfessionalScheduleUseCase = new GetProfessionalScheduleUseCase(
  mysqlScheduleRepository,
  mysqlProfessionalRepository,
  scheduleDependencies,
);

const scheduleServicesUseCase = new ScheduleServicesUseCase(
  mysqlScheduleRepository,
  mysqlProfessionalRepository,
  mysqlScheduleServiceRepository,
  mysqlUserRepository,
  getAvailableSlots,
  mysqlProfessionalServiceRepository,
  professionalDependencies,
);

const getUserSchedulesUseCase = new GetUserSchedulesUseCase(
  mysqlProfessionalRepository,
  mysqlScheduleRepository,
  scheduleDependencies,
);

const getLinkedProfessionalUseCase = new GetLinkedProfessionalUseCase(
  mysqlProfessionalRepository,
);

const sendPushNotificationUseCase = new SendPushNotificationUseCase(
  mysqlNotificationRepository,
  mysqlDeviceRepository,
  firebaseNotificationGateway,
);

const professionalCancelScheduleUseCase = new ProfessionalCancelScheduleUseCase(
  mysqlScheduleRepository,
  scheduleDependencies,
  sendPushNotificationUseCase,
);

const reserveSlotsUseCase = new ReserveSlotsUseCase(
  mysqlProfessionalRepository,
  getAvailableSlots,
  mysqlScheduleRepository,
  scheduleDependencies,
);

const sendRateProfessionalNotificationUseCase =
  new SendRateProfessionalNotificationUseCase(
    mysqlScheduleRepository,
    mysqlProfessionalRepository,
    sendPushNotificationUseCase,
  );

const getProfessionalRatingsUseCase = new GetProfessionalRatingsUseCase(
  mysqlRatingRepository,
);

const rateProfessionalUseCase = new RateProfessionalUseCase(
  mysqlRatingRepository,
);

export {
  saveScheduleRuleUseCase,
  createServiceUseCase,
  changeServiceStatusUseCase,
  getProfessionalsUseCase,
  getProfessionalUseCase,
  editProfessionalUseCase,
  setProfessionalPictureUseCase,
  removeProfessionalPictureUseCase,
  getSpecialtiesUseCase,
  getInsurancesUseCase,
  getProfessionalInternalProfileUseCase,
  getProfessionalInternalServicesUseCase,
  getProfessionalInternalSlotsUseCase,
  getScheduleUseCase,
  cancelScheduleUseCase,
  getSchedulingSlotsUseCase,
  getProfessionalScheduleUseCase,
  scheduleServicesUseCase,
  getUserSchedulesUseCase,
  getLinkedProfessionalUseCase,
  professionalCancelScheduleUseCase,
  reserveSlotsUseCase,
  sendRateProfessionalNotificationUseCase,
  getProfessionalRatingsUseCase,
  rateProfessionalUseCase,
  registerDeviceUseCase,
  getNotificationsUseCase,
  countUnreadNotificationsUseCase,
  markNotificationReadUseCase,
  sendPushNotificationUseCase,
  signUpUseCase,
  signInUseCase,
  getUserUseCase,
  editProfileUseCase,
  changePasswordUseCase,
  requestPasswordResetUseCase,
  setNewPasswordUseCase,
};
