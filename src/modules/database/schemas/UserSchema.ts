import { User } from 'src/@core/domain/entities/User';
import { EntitySchema } from 'typeorm';

const UserSchema = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      type: 'varchar',
      primary: true,
      length: 255,
    },
    email: {
      type: 'varchar',
      length: 255,
      nullable: false,
      unique: true,
    },
    fullName: {
      name: 'full_name',
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    document: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    phone: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    createdAt: {
      name: 'created_at',
      type: 'datetime',
      createDate: true,
      nullable: false,
    },
    updatedAt: {
      name: 'updated_at',
      type: 'datetime',
      updateDate: true,
      nullable: false,
    },
    username: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    password: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    resetPasswordCode: {
      name: 'reset_password_code',
      type: 'int',
      default: 0,
      nullable: false,
    },
    resetPasswordDateTime: {
      name: 'reset_password_date_time',
      type: 'datetime',
      nullable: true,
    },
    resetPasswordTries: {
      name: 'reset_password_tries',
      type: 'int',
      default: 0,
      nullable: false,
    },
    methods: {
      type: 'json',
      nullable: false,
    },
    sessionToken: {
      name: "session_token",
      type: 'varchar',
      length: 255,
      nullable: true,
    },
    deletedAt: {
      name: 'deleted_at',
      type: 'datetime',
      nullable: true,
    },
  },
});

export default UserSchema;
