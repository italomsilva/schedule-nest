import { Rating } from '../../../domain/entities/Rating';
import { User } from '../../../domain/entities/User';

export type RatingOutput = {
  id: string;
  comments: string;
  stars: number;
  userName: string;
  createdAt: Date;
};
export function formatRating(r: Rating, user: User): RatingOutput {
  return {
    id: r.id,
    comments: r.comment,
    stars: r.stars,
    userName: user.fullName,
    createdAt: r.createdAt,
  };
}
