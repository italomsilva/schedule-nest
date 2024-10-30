import { Professional } from 'src/@core/domain/entities/Professional';
import { EntitySchema } from 'typeorm';

const ProfessionalSchema = new EntitySchema<Professional>({
  name: 'Professional',
  tableName: 'professionals',
  columns: {
    id: {
      name: 'id',
      type: 'varchar',
      primary: true,
      length: 255,
    },
    name: {
      name: 'name',
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    crm: {
      name: 'crm',
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    rating: {
      name: 'rating',
      type: 'float',
      nullable: false,
      default: 0,
    },
    ratingCount: {
      name: 'rating_count',
      type: 'int',
      nullable: false,
    },
    address: {
      name: 'address',
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    phone: {
      name: 'phone',
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    profileImageUrl: {
      name: 'profile_image_url',
      type: 'text',
      nullable: true,
    },
    slotInterval: {
      name: 'slot_interval',
      type: 'int',
      nullable: true,
    },
    location: {
      name: 'location',
      type: 'point',
      nullable: true,
    },
    ownerId: {
      name: 'owner_id',
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    createdAt: {
      name: 'created_at',
      type: 'datetime',
      nullable: false,
    },
    updatedAt: {
      name: 'updated_at',
      type: 'datetime',
      nullable: false,
    },
    searchWords: {
      name: 'search_words',
      type: 'varchar',
      length: 255,
      nullable: true,
    },
    visible: {
      name: 'visible',
      type: 'boolean',
      nullable: false,
      default: true,
    },
    finishedProfile: {
      name: 'finished_profile',
      type: 'boolean',
      nullable: false,
      default: false,
    },
    deletedAt: {
      name: 'deleted_at',
      type: 'datetime',
      nullable: true,
    },
  },
});

export default ProfessionalSchema;
