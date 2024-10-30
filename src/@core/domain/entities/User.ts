import { UUID } from './UUID';

export class User {
  constructor(
    public id: string = UUID.randomUUID(),
    public email: string,
    public username: string,
    public password: string,
    public fullName: string,
    public document: string,
    public phone: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public resetPasswordCode: number = 0,
    public resetPasswordDateTime: Date | null = null,
    public resetPasswordTries: number = 0,
    public methods: string[] = [],
    public sessionToken?: string,
    public deletedAt: Date | null = null,
  ) {}

  static create(data: CreateUserInput): User {
    const id = UUID.randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();

    return new User(
      id,
      data.email,
      data.username,
      data.password,
      data.fullName,
      data.document,
      data.phone,
      createdAt,
      updatedAt,
      0,
      null,
      0,
      [],
      data.sessionToken,
      null, 
    );
  }

  toDatabase(): any {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      password: this.password,
      full_name: this.fullName,
      document: this.document,
      phone: this.phone,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
      reset_password_code: this.resetPasswordCode,
      reset_password_date_time: this.resetPasswordDateTime
        ? this.resetPasswordDateTime.toISOString()
        : null,
      reset_password_tries: this.resetPasswordTries,
      methods: JSON.stringify(this.methods),
      session_token: this.sessionToken,
      deleted_at: this.deletedAt ? this.deletedAt.toISOString() : null,
    };
  }

  static fromDatabase(data: any): User {
    return new User(
      data.id,
      data.email,
      data.username,
      data.password,
      data.full_name,
      data.document,
      data.phone,
      new Date(data.created_at),
      new Date(data.updated_at),
      data.reset_password_code,
      data.reset_password_date_time
        ? new Date(data.reset_password_date_time)
        : null,
      data.reset_password_tries,
      JSON.parse(data.methods),
      data.session_token,
      data.deleted_at ? new Date(data.deleted_at) : null,
    );
  }

  update(updatedFields: Partial<User>): void {
    Object.assign(this, updatedFields);
    this.updatedAt = new Date();
  }

  static createFromArray(dataArray: any[]): User[] {
    return dataArray.map((data) => User.fromDatabase(data));
  }
}

type CreateUserInput = {
  email: string;
  username: string;
  password: string;
  fullName: string;
  document: string;
  phone: string;
  sessionToken?: string;
};