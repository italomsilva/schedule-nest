import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { Specialty } from '../../../../domain/entities/Specialty';
import { SpecialtyRepository } from '../../../../domain/repositories/SpecialtyRepository';

export class MySqlSpecialtyRepository implements SpecialtyRepository {
  constructor(private readonly repository: any) {}

  async findByIds(ids: string[]): Promise<Specialty[]> {
    const queryString = `
      SELECT *
      FROM specialties
      WHERE id IN (${ids.map((id) => `'${id}'`).join(',')}) AND deleted_at IS NULL;
    `;
    const result = await this.repository.query(queryString);
    return Specialty.createFromArray(result);
  }

  async findAllByName(name: string): Promise<Specialty[]> {
    const queryString = `
      SELECT *
      FROM specialties
      WHERE name = '${name}' AND deleted_at IS NULL;
    `;
    const result = await this.repository.query(queryString);
    return Specialty.createFromArray(result);
  }

  async findById(id: string): Promise<Specialty | null> {
    const queryString = `
      SELECT *
      FROM specialties
      WHERE id = '${id}' AND deleted_at IS NULL;
    `;
    const result = await this.repository.query(queryString);
    return result.length ? Specialty.fromDatabase(result[0]) : null;
  }

  async findAll(): Promise<Specialty[]> {
    const queryString = `
      SELECT *
      FROM specialties
      WHERE deleted_at IS NULL
      ORDER BY name ASC;
    `;
    const result = await this.repository.query(queryString);
    return Specialty.createFromArray(result);
  }

  async save(specialty: Specialty): Promise<void> {
    await this.repository.save(specialty);
  }

  async update(specialty: Specialty): Promise<void> {
    if (specialty.deletedAt) {
      await this.repository.save(specialty);
    } else {
      throw new ErrorHandler('UPDATE ERROR');
    }
  }

  async delete(id: string): Promise<void> {
    const queryString = `
      UPDATE specialties
      SET deleted_at = NOW()
      WHERE id = '${id}' AND deleted_at IS NULL;
    `;
    await this.repository.query(queryString);
  }

  async findByName(name: string): Promise<Specialty | null> {
    const queryString = `
      SELECT *
      FROM specialties
      WHERE name = '${name}' AND deleted_at IS NULL;
    `;
    const result = await this.repository.query(queryString);
    return result.length ? Specialty.fromDatabase(result[0]) : null;
  }
}
