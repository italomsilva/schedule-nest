import { In } from 'typeorm';
import { ProfessionalRepository } from '../../../../domain/repositories/ProfessionalRepository';
import { Professional } from '../../../../domain/entities/Professional';
import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { ProfessionalSpecialtyRepository } from 'src/@core/domain/repositories/ProfessionalSpecialtyRepository';

export class MySqlProfessionalRepository implements ProfessionalRepository {
  constructor(
    private readonly repository: any,
    private readonly professionalSpecialtyRepository: ProfessionalSpecialtyRepository,
  ) {}

  async save(professional: Professional): Promise<Professional> {
    if (!professional.deletedAt) {
      return this.repository.save(professional);
    }
    throw new ErrorHandler('SAVE ERROR');
  }

  async delete(id: string): Promise<void> {
    const queryString = `
      UPDATE professionals
      SET deleted_at = NOW()
      WHERE id = '${id}'
      AND deleted_at IS NULL
    `;
    await this.repository.query(queryString);
  }

  async findByIds(ids: string[]): Promise<Professional[]> {
    const queryString = `
      SELECT *
      FROM professionals
      WHERE id IN (${ids.map((id) => `'${id}'`).join(',')})
      AND deleted_at IS NULL
    `;
    const result = await this.repository.query(queryString);
    return result.map((professional: any) =>
      Professional.fromDatabase(professional),
    );
  }

  async findById(id: string): Promise<Professional | null> {
    const queryString = `
      SELECT *
      FROM professionals
      WHERE id = '${id}'
      AND deleted_at IS NULL
    `;
    const result = await this.repository.query(queryString);
    return result.length ? Professional.fromDatabase(result[0]) : null;
  }

  async findAll(): Promise<Professional[]> {
    const queryString = `
      SELECT *
      FROM professionals
      WHERE deleted_at IS NULL
    `;
    const result = await this.repository.query(queryString);
    return result.map((professional: any) =>
      Professional.fromDatabase(professional),
    );
  }

  async findByOwner(ownerId: string): Promise<Professional | null> {
    const queryString = `
      SELECT *
      FROM professionals
      WHERE owner_id = '${ownerId}'
      AND deleted_at IS NULL
    `;
    const result = await this.repository.query(queryString);
    return result.length ? Professional.fromDatabase(result[0]) : null;
  }

  async findByCRM(crm: number): Promise<Professional | null> {
    const queryString = `
      SELECT *
      FROM professionals
      WHERE crm = ${crm}
      AND deleted_at IS NULL
    `;
    const result = await this.repository.query(queryString);
    return result.length ? Professional.fromDatabase(result[0]) : null;
  }

  async findProfessionals2(filters: QueryFilters): Promise<Professional[]> {
    let queryString = `
      SELECT *
      FROM professionals p
      WHERE deleted_at IS NULL
    `;

    let filter = ' AND ';

    if (filters.specialties && filters.specialties.length > 0) {
      queryString += `
        ${filter} p.id IN (
          SELECT DISTINCT ps.professional_id
          FROM professional_specialties AS ps
          WHERE ps.specialty_id IN (${filters.specialties.join(',')})
        )
      `;
      filter = ' AND ';
    }

    if (filters.search) {
      queryString += ` ${filter} LOWER(p.name) LIKE '%${filters.search}%'`;
      filter = ' AND ';
    }

    if (filters.slat && filters.slong && filters.nlat && filters.nlong) {
      const polygon = `
        'POLYGON((
          ${filters.slat} ${filters.slong}, 
          ${filters.nlat} ${filters.slong}, 
          ${filters.nlat} ${filters.nlong}, 
          ${filters.slat} ${filters.nlong}, 
          ${filters.slat} ${filters.slong}
        ))'
      `;

      queryString += `
        ${filter} ST_Contains(
          ST_PolygonFromText(${polygon}),
          p.location
        )
      `;
      filter = ' AND ';
    }

    if (filters.limit) {
      queryString += ` LIMIT ${filters.limit} OFFSET ${filters.offset || 0}`;
    }

    console.log(queryString);
    const professionals = await this.repository.query(queryString);

    const formattedProfessionals = professionals.map((p: any) => {
      return {
        ...p,
        location: formatCoordinates({
          latitude: p.location.x,
          longitude: p.location.y,
        }),
      };
    });

    return formattedProfessionals;
  }
  async findProfessionals(filters: QueryFilters): Promise<Professional[]> {
    // Busca todos os profissionais que não foram deletados
    const queryString = `
      SELECT *
      FROM professionals
      WHERE deleted_at IS NULL
    `;

    // Executa a consulta para obter todos os profissionais
    let filteredProfessionals = await this.repository.query(queryString);

    // Filtra por especialidades
    if (filters.specialties && filters.specialties.length > 0) {
      const professionalIds =
        await this.professionalSpecialtyRepository.findProfessionals(
          filters.specialties,
        );

      filteredProfessionals = filteredProfessionals.filter((p) =>
        professionalIds.includes(p.id),
      );
    }

    // Filtra por nome
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredProfessionals = filteredProfessionals.filter(
        (professional: Professional) =>
          professional.searchWords.toLowerCase().includes(searchLower),
      );
    }

    // Filtra por localização usando coordenadas
    if (filters.slat && filters.slong && filters.nlat && filters.nlong) {
      filteredProfessionals = filteredProfessionals.filter(
        (professional: any) => {
          const [latitude, longitude] = [
            professional.location.y,
            professional.location.x,
          ];
          return (
            latitude >= filters.slat &&
            latitude <= filters.nlat &&
            longitude >= filters.slong &&
            longitude <= filters.nlong
          );
        },
      );
    }

    // Aplica limites de paginação
    if (filters.limit) {
      const offset = filters.offset || 0;
      filteredProfessionals = filteredProfessionals.slice(
        offset,
        offset + filters.limit,
      );
    }

    // Formata as coordenadas
    const formattedProfessionalsLocation = filteredProfessionals.map(
      (professional: any) => {
        return {
          ...professional,
        };
      },
    );
    const formattedProfessionals = formattedProfessionalsLocation.map((p) =>
      Professional.fromDatabase(p),
    );
    return formattedProfessionals;
  }
}

function formatCoordinates(coordinates: {
  latitude: number;
  longitude: number;
}): string {
  return `POINT(${coordinates.latitude} ${coordinates.longitude})`;
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
