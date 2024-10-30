import { Rating } from '../entities/Rating';
import { User } from '../entities/User';

export interface RatingRepository {
  findByUserAndProfessional(
    userId: string,
    professionalId: string,
  ): Promise<Rating | null>;
  save(rating: Rating): Promise<void>;
  delete(rating: Rating): Promise<void>;
  findByProfessional(
    professionalId: string,
    limit: number,
    page: number,
  ): Promise<Rating[]>;
  findUser(rating: Rating): Promise<User | null>;
  deleteByUser(userId: string): Promise<void> 
}
