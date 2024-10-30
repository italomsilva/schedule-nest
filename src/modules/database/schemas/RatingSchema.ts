import { Rating } from 'src/@core/domain/entities/Rating';
import { EntitySchema } from 'typeorm';

const RatingSchema = new EntitySchema<Rating>({
  name: 'Rating',
  tableName: 'ratings',
  columns: {
    id: {
      type: 'varchar',
      primary: true,
      length: 255,
    },
    userId: {
      name: 'user_id',
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    professionalId: {
      name: 'professional_id',
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    stars: {
      type: 'int',
      nullable: false,
    },
    comment: {
      type: 'text',
      nullable: true,
    },
    createdAt: {
      name: 'created_at',
      type: 'datetime',
      nullable: false,
      createDate: true,
    },
    updatedAt: {
      name: 'updated_at',
      type: 'datetime',
      nullable: false,
      updateDate: true,
    },
    deletedAt: {
      name: 'deleted_at',
      type: 'datetime',
      nullable: true,
    },
  },
});

export default RatingSchema;
