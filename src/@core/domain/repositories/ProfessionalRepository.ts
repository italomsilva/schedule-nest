import { Professional } from "../entities/Professional";

export interface ProfessionalRepository {
  findById(id: string): Promise<Professional | null>;
  findByIds(ids: string[]): Promise<Professional[]>;
  findAll(
    location?: {
      latitude: number;
      longitude: number;
      maxDistance: number;
    },
    pagination?: {
      limit: number;
      skip: number;
    }
  ): Promise<Professional[]>;
  save(professional: Professional): Promise<Professional>;
  delete(id: string): void;
  findByCRM(crm: number): Promise<Professional | null>;
  findByOwner(id: string): Promise<Professional | null>;
  findProfessionals(filters: QueryFilters): Promise<Professional[]>;
}

interface QueryFilters {
  specialties?: string[];
  slat?: number;
  slong?: number;
  nlat?: number;
  nlong?: number;
  limit?: number;
  offset?: number;
  search?: string;
}
