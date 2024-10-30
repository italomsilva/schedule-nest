import { UUID } from './UUID';

export class Rating {
  constructor(
    public id: string = UUID.randomUUID(),
    public professionalId: string,
    public userId: string,
    public stars: number,
    public comment: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt: Date = null,
  ) {}

  static create(
    userId: string,
    professionalId: string,
    stars: number,
    comment: string
  ): Rating {
    const id = UUID.randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();

    return new Rating(id, professionalId, userId, stars, comment, createdAt, updatedAt);
  }

  static fromDatabase(data: any): Rating {
    return new Rating(
      data.id,
      data.professional_id,
      data.user_id,
      data.stars,
      data.comment,
      new Date(data.created_at),
      new Date(data.updated_at)
    );
  }

  toDatabase(): any {
    return {
      id: this.id,
      professional_id: this.professionalId,
      user_id: this.userId,
      stars: this.stars,
      comment: this.comment,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
    };
  }

  static createFromArray(dataArray: Array<any>): Rating[] {
    return dataArray.map((data) => Rating.fromDatabase(data));
  }
}
