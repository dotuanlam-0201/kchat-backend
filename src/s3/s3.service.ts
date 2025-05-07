import { DeleteObjectCommand, DeleteObjectCommandInput, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  constructor(private readonly s3Client: S3Client, private readonly configService: ConfigService) { }

  private generateUniqueFileName(
    file: Express.Multer.File,
    customPath?: string
  ): string {
    const uniquePrefix = uuidv4();
    const fileExtension = file.originalname.split('.').pop();
    const path = customPath ? `${customPath}/` : '';
    return `${path}${uniquePrefix}.${fileExtension}`;
  }

  async uploadFile(
    file: Express.Multer.File,
    customPath?: string
  ): Promise<{ url: string; key: string }> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const bucket = this.configService.getOrThrow('AWS_S3_BUCKET_NAME');
    const uniqueFileName = this.generateUniqueFileName(file, customPath);

    const uploadParams = {
      Bucket: bucket,
      Key: uniqueFileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      await this.s3Client.send(new PutObjectCommand(uploadParams));
      const fileUrl = `https://${bucket}.s3.amazonaws.com/${uniqueFileName}`;
      return {
        url: fileUrl,
        key: uniqueFileName
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteFile(key: string) {
    try {
      const bucket = this.configService.getOrThrow('AWS_S3_BUCKET_NAME');
      const deleteParams: DeleteObjectCommandInput = {
        Bucket: bucket,
        Key: key
      };
      return await this.s3Client.send(new DeleteObjectCommand(deleteParams));

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
