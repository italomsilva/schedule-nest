import { UUID } from './UUID';

export class Professional {
  constructor(
    public id: string = UUID.randomUUID(),
    public name: string,
    public crm: number,
    public rating: number = 0,
    public ratingCount: number = 0,
    public address: string,
    public phone: string,
    public profileImageUrl: string | null,
    public slotInterval: number,
    public location: string | null,
    public ownerId: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public searchWords: string,
    public visible: boolean = true,
    public finishedProfile: boolean = false,
    public deletedAt: Date | null = null,
  ) {}

  static create(data: {
    name: string;
    crm: number;
    address: string;
    phone: string;
    slotInterval: number;
    location: string | null;
    ownerId: string;
    profileImageUrl?: string | null;
    visible?: boolean;
    finishedProfile?: boolean;
  }): Professional {
    const id = UUID.randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();

    const searchWords = `${data.name.toLowerCase()} ${data.crm} ${data.address.toLowerCase()}`;
    const visible = data.visible ?? true;
    const finishedProfile = data.finishedProfile ?? false;

    return new Professional(
      id,
      data.name,
      data.crm,
      0,
      0,
      data.address,
      data.phone,
      data.profileImageUrl || null,
      data.slotInterval,
      data.location,
      data.ownerId,
      createdAt,
      updatedAt,
      searchWords,
      visible,
      finishedProfile,
    );
  }

  update(updatedFields: Partial<Professional>): void {
    Object.assign(this, updatedFields);
    this.updatedAt = new Date();
  }

  static fromDatabase(data: any): Professional {
    return new Professional(
      data.id,
      data.name,
      data.crm,
      data.rating,
      data.rating_count,
      data.address,
      data.phone,
      data.profile_image_url,
      data.slot_interval,
      data.location? formatCoordinates(data.location): null,
      data.owner_id,
      new Date(data.created_at),
      new Date(data.updated_at),
      data.search_words,
      data.visible,
      data.finished_profile,
      data.deleted_at ? new Date(data.deleted_at) : null,
    );
  }

  toDatabase(): any {
    return {
      id: this.id,
      name: this.name,
      crm: this.crm,
      rating: this.rating,
      rating_count: this.ratingCount,
      address: this.address,
      phone: this.phone,
      profile_imageUrl: this.profileImageUrl,
      slot_interval: this.slotInterval,
      location: this.location,
      owner_id: this.ownerId,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
      search_words: this.searchWords,
      visible: this.visible,
      finished_profile: this.finishedProfile,
      deleted_at: this.deletedAt ? this.deletedAt.toISOString() : null,
    };
  }

  static createFromArray(dataArray: Array<any>): Professional[] {
    return dataArray.map((data) => Professional.fromDatabase(data));
  }
}

function formatCoordinates(coordinates: any): string {
  const { x, y } = coordinates;
  return `POINT(${x} ${y})`;
}
