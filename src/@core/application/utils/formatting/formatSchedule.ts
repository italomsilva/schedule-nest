import { Insurance } from '../../../domain/entities/Insurance';
import { Professional } from '../../../domain/entities/Professional';
import { Schedule } from '../../../domain/entities/Schedule';
import { Service } from '../../../domain/entities/Service';
import { Specialty } from '../../../domain/entities/Specialty';
import { User } from '../../../domain/entities/User';
import { ProfessionalOutput, formatProfessional } from './formatProfessional';
import { ServiceOutput, formatService } from './formatService';

export function formatSchedule(
  s: Schedule,
  user: User | null = null,
  services: Service[] | null = null,
  professional: {
    professional?: Professional;
    services: Service[];
    specialties: Specialty[];
    insurances: Insurance[];
  },
): OutputSchedule {
  const result = {
    id: s.id,
    startDate: new Date(s.startDate),
    endDate: new Date(s.endDate),
    status: s.status,
    professional: formatProfessional(
      professional.professional,
      professional.specialties,
      professional.services,
      professional.insurances,
    ),
    services: services !== null ? services.map(formatService) : [],
    user:
      user !== null
        ? {
            id: user.id,
            fullname: user.fullName,
            phone: user.phone,
          }
        : null,
    block: s.block,
  };

  return result;
}

export type OutputSchedule = {
  id: string;
  startDate: Date;
  endDate: Date;
  status: string;
  professional?: ProfessionalOutput | null;
  services: ServiceOutput[];
  user: {
    id: string;
    fullname: string;
    phone: string;
  } | null;
  block: boolean;
};
