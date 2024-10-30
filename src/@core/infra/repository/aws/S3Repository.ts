import {
  PutObjectCommand,
  DeleteObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ImageRepository } from 'src/@core/domain/repositories/ImageRepository';
import * as crypto from 'crypto';

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const s3Client = new S3Client({
  region: 'us-east-1',
  credentials,
});

export class S3Repository implements ImageRepository {
  async upload(file: Buffer, folder: string): Promise<string> {
    const fileName = crypto.randomUUID();
    const params = {
      Bucket: `${process.env.AWS_BUCKET}`,
      Key: `${folder}/${fileName}`,
      Body: file,
    };

    await s3Client.send(new PutObjectCommand(params));
    const url = this.getUrl(fileName, folder);
    return url;
  }

  async delete(url: string): Promise<void> {
    const { bucket, key } = this.extractBucketAndKey(url);
    const params = {
      Bucket: bucket,
      Key: key,
    };

    await s3Client.send(new DeleteObjectCommand(params));
  }

  getUrl(fileName: string, folder: string): string {
    const url = `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${folder}/${fileName}`;
    return url;
  }

  private extractBucketAndKey(url: string): { bucket: string; key: string } {
    const regex = /^https:\/\/([^\.]+)\.s3\.amazonaws\.com\/(.+)$/;
    const match = url.match(regex);

    if (!match) {
      throw new Error('Invalid S3 URL format');
    }

    const bucket = match[1];
    const key = match[2];

    return { bucket, key };
  }
}
