import { Rating } from 'src/@core/domain/entities/Rating';
import { User } from 'src/@core/domain/entities/User';
import { RatingRepository } from 'src/@core/domain/repositories/RatingRepository';

export class MySqlRatingRepository implements RatingRepository {
  constructor(private readonly repository: any) {}

  async findByUserAndProfessional(
    userId: string,
    professionalId: string,
  ): Promise<Rating | null> {
    const queryString = `
      SELECT * 
      FROM ratings
      WHERE user_id = '${userId}' 
      AND professional_id = '${professionalId}'
      AND deleted_at IS NULL
    `;
    const result = await this.repository.query(queryString);
    return result.length > 0 ? Rating.fromDatabase(result[0]) : null;
  }

  async delete(rating: Rating): Promise<void> {
    const queryString = `
      UPDATE ratings
      SET deleted_at = NOW()
      WHERE id = '${rating.id}'
      AND deleted_at IS NULL
    `;
    await this.repository.query(queryString);
  }

  async save(rating: Rating): Promise<void> {
    await this.repository.save(rating);
  }

  async findByProfessional(
    professionalId: string,
    limit: number,
    page: number,
  ): Promise<Rating[]> {
    const queryString = `
      SELECT * 
      FROM ratings
      WHERE professional_id = '${professionalId}'
      AND deleted_at IS NULL
      ORDER BY created_at DESC
      LIMIT ${limit}
      OFFSET ${limit * page}
    `;
    const result = await this.repository.query(queryString);
    return result.map((data: any) => Rating.fromDatabase(data));
  }

  async findUser(rating: Rating): Promise<User | null> {
    const queryString = `
      SELECT * 
      FROM users
      WHERE id = '${rating.userId}'
    `;
    const result = await this.repository.query(queryString);
    return result.length > 0 ? User.fromDatabase(result[0]) : null;
  }

  async deleteByUser(userId: string): Promise<void> {
    const queryString = `
      UPDATE ratings
      SET deleted_at = NOW()
      WHERE user_id = '${userId}'
      AND deleted_at IS NULL
    `;
    await this.repository.query(queryString);
  }
}
