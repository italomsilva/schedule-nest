import { formatProfessional } from '../../utils/formatting/formatProfessional';
import { ProfessionalRepository } from '../../../domain/repositories/ProfessionalRepository';
import { ProfessionalDependencies } from './ProfessionalDependencies';

export class GetProfessionalsUseCase {
  constructor(
    private professionalRepository: ProfessionalRepository,
    private professionalDependencies: ProfessionalDependencies,
  ) {}

  async execute(input: Input): Promise<Output> {
    const queryFilters: any = {};

    if (input.specialties && input.specialties.length > 0) {
      queryFilters.specialties = input.specialties;
    }

    if (input.slat && input.slong && input.nlat && input.nlong) {
      queryFilters.slat = input.slat;
      queryFilters.slong = input.slong;
      queryFilters.nlat = input.nlat;
      queryFilters.nlong = input.nlong;
    }

    if (input.page) {
      const pageSize = 20;

      queryFilters.limit = pageSize;
      queryFilters.offset = (input.page - 1) * pageSize;
    }

    if (input.search) {
      queryFilters.search = input.search.toLowerCase();
    }

    const professionals =
      await this.professionalRepository.findProfessionals(queryFilters);

    const allProfessionalsPromises = professionals.map(async (professional) => {
      const { specialties, services, insurances } =
        await this.professionalDependencies.get(professional);
      return formatProfessional(
        professional,
        specialties,
        services,
        insurances,
      );
    });

    const allProfessionals = await Promise.all(allProfessionalsPromises);

    return allProfessionals;
  }
}

type Input = {
  specialties?: string[];
  slat?: number;
  slong?: number;
  nlat?: number;
  nlong?: number;
  page?: number;
  search?: string;
};

type Output = ProfessionalOutput[];

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

type ServiceOutput = {
  id: string;
  name: string;
  price: number;
  duration: number;
  available: boolean;
};

type SpecialtyOutput = {
  id: string;
  name: string;
};

type InsuranceOutput = {
  id: string;
  name: string;
};

type LocationOutput = {
  latitude: number | undefined;
  longitude: number | undefined;
};
