import { Insurance } from '../../../domain/entities/Insurance';
import { Service } from '../../../domain/entities/Service';
import { Specialty } from '../../../domain/entities/Specialty';
import { Professional } from '../../../domain/entities/Professional';
import { ServiceOutput, formatService } from './formatService';
import { SpecialtyOutput, formatSpecialty } from './formatSpecialty';
import { InsuranceOutput, formatInsurance } from './formatInsurace';
import { getCoordinates } from './getCoordinates';

function formatProfessional(
  professional: Professional,
  specialties: Specialty[] | null = null,
  services: Service[] | null = null,
  insurances: Insurance[] | null = null,
): ProfessionalOutput {
  const result = {
    id: professional.id,
    name: professional.name,
    specialties: specialties ? specialties.map(formatSpecialty) : [],
    crm: professional.crm,
    services: services ? services.map(formatService) : [],
    rating: professional.rating,
    ratingCount: professional.ratingCount,
    address: professional.address,
    phone: professional.phone,
    insurances: insurances ? insurances.map(formatInsurance) : [],
    picture: professional.profileImageUrl || '',
    location: professional.location
      ? getCoordinates(professional.location)
      : null,
  };

  return result;
}

type ProfessionalOutput = {
  id: string;
  name: string;
  crm: number;
  rating: number;
  ratingCount: number;
  address: string;
  phone: string;
  picture: string | null;
  location: LocationOutput | {};
  services: ServiceOutput[];
  specialties: SpecialtyOutput[];
  insurances: InsuranceOutput[];
};

type LocationOutput = {
  latitude: number | undefined;
  longitude: number | undefined;
};

export { formatProfessional, LocationOutput, ProfessionalOutput };
