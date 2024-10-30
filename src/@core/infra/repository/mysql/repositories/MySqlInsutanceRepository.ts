import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { Insurance } from '../../../../domain/entities/Insurance';
import { InsuranceRepository } from '../../../../domain/repositories/InsuranceRepository';

export class MySqlInsuranceRepository implements InsuranceRepository {
  constructor(private readonly repository: any) {}

  async save(insurance: Insurance): Promise<void> {
    await this.repository.save(insurance);
  }

  async update(insurance: Insurance): Promise<void> {
    if (!insurance.deletedAt) {
      return this.repository.save(insurance);
    } else {
      throw new ErrorHandler('UPDATE ERROR');
    }
  }

  async delete(id: string): Promise<void> {
    const queryString = `
      UPDATE insurances
      SET deleted_at = NOW()
      WHERE id = '${id}'
      AND deleted_at IS NULL;
    `;
    await this.repository.query(queryString);
  }

  async findByIds(ids: string[]): Promise<Insurance[]> {
    const queryString = `
      SELECT *
      FROM insurances
      WHERE id IN (${ids.map((id) => `'${id}'`).join(',')}) AND deleted_at IS NULL;
    `;
    const result = await this.repository.query(queryString);
    return Insurance.createFromArray(result);
  }

  async findById(id: string): Promise<Insurance | null> {
    const queryString = `
      SELECT *
      FROM insurances
      WHERE id = '${id}' AND deleted_at IS NULL;
    `;
    const result = await this.repository.query(queryString);
    return result.length ? Insurance.fromDatabase(result[0]) : null;
  }

  async findAll(): Promise<Insurance[]> {
    const queryString = `
      SELECT *
      FROM insurances
      WHERE deleted_at IS NULL
      ORDER BY name ASC;
    `;
    const result = await this.repository.query(queryString);
    return Insurance.createFromArray(result);
  }

  async findByName(name: string): Promise<Insurance | null> {
    const queryString = `
      SELECT *
      FROM insurances
      WHERE name = '${name}' AND deleted_at IS NULL;
    `;
    const result = await this.repository.query(queryString);
    return result.length ? Insurance.fromDatabase(result[0]) : null;
  }
}
