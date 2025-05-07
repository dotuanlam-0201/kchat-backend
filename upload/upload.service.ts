import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class UploadService {
  constructor(private s3Service: S3Service) { }
  async uploadSingle(file: Express.Multer.File) {
    try {
      const fileUpload = await this.s3Service.uploadFile(file)
      if (!fileUpload) throw new BadRequestException('Upload to S3 failed!')
      return fileUpload
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async deleteImage(key: string) {
    try {
      return await this.s3Service.deleteFile(key)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
