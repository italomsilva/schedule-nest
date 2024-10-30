import { Specialty } from '../../../domain/entities/Specialty';
import { Insurance } from '../../../domain/entities/Insurance';
import { Professional } from '../../../domain/entities/Professional';
import { InsuranceOutput, formatInsurance } from './formatInsurace';
import { SpecialtyOutput, formatSpecialty } from './formatSpecialty';
import { getCoordinates } from './getCoordinates';

export function formatInternalProfessional(
  p: Professional,
  specialties: Specialty[] | null = null,
  insurances: Insurance[] | null = null,
): ProfessionalInternalOutput {
  return {
    id: p.id,
    name: p.name,
    specialties: specialties.map(formatSpecialty),
    crm: p.crm,
    address: p.address,
    phone: p.phone,
    insurances: insurances.map(formatInsurance),
    picture: p.profileImageUrl !== null ? p.profileImageUrl : null,
    location: p.location ? getCoordinates(p.location) : {},
  };
}

export type ProfessionalInternalOutput = {
  id: string;
  name: string;
  specialties: SpecialtyOutput[];
  crm: number;
  address?: string;
  phone?: string;
  insurances?: InsuranceOutput[];
  picture: string | null;
  location: any;
};
