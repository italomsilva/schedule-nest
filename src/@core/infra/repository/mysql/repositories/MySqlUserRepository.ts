import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { User } from 'src/@core/domain/entities/User';
import { UserRepository } from 'src/@core/domain/repositories/UserRepository';

export class MySqlUserRepository implements UserRepository {
  constructor(private readonly repository: any) {}

  async findById(id: string): Promise<User | null> {
    const queryString = `
      SELECT *
      FROM users
      WHERE id = '${id}' AND deleted_at IS NULL;
    `;
    const result = await this.repository.query(queryString);
    return result.length ? User.fromDatabase(result[0]) : null;
  }

  async findAll(): Promise<User[]> {
    const queryString = `
      SELECT *
      FROM users
      WHERE deleted_at IS NULL;
    `;
    const result = await this.repository.query(queryString);
    return User.createFromArray(result);
  }

  async save(user: User): Promise<void> {
    return this.repository.save(user);
  }

  async update(user: User): Promise<User> {
    if (!user.deletedAt) {
      return this.repository.save(user);
    }
    throw new ErrorHandler('UPDATE ERROR');
  }

  async delete(id: string): Promise<void> {
    const queryString = `
      UPDATE users
      SET deleted_at = NOW()
      WHERE id = '${id}';
    `;
    await this.repository.query(queryString);
  }

  async findByEmail(email: string): Promise<User | null> {
    const queryString = `
      SELECT *
      FROM users
      WHERE email = '${email}' 
      AND deleted_at IS NULL;
    `;
    const result = await this.repository.query(queryString);
    return result.length ? User.fromDatabase(result[0]) : null;
  }

  async updatePassword(userId: string, newPassword: string): Promise<User> {
    const user = await this.findById(userId);

    if (!user || user.deletedAt) throw new ErrorHandler('UPDATE ERROR');

    user.password = newPassword;
    user.updatedAt = new Date();

    await this.update(user);

    return user;
  }
}
