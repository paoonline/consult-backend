// s3.service.ts
import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
  private s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
  });

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const key = `customers/${uuid()}-${file.originalname}`;

    const uploadResult = await this.s3
      .upload({
        Bucket: process.env.AWS_S3_BUCKET || '',
        Key: key,
        Body: file.buffer,
        // ACL: 'public-read',
        ContentType: file.mimetype,
      })
      .promise();

    return uploadResult.Location; // This is the S3 URL
  }
}
