export interface ImageRepository {
  upload(image: Buffer, folder: string): Promise<string>;
  delete(key: string): Promise<void>;
}
