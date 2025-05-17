import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v2 as Cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';
@Injectable()
export class UploadService {
  constructor() {
    Cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }
  private uploadBufferToCloudinary(buffer: Buffer, folder: string, resourceType: 'image' | 'raw' | 'video'): Promise<UploadApiResponse | undefined> {
    return new Promise((resolve, reject) => {
      const stream = Cloudinary.uploader.upload_stream(
        { folder, resource_type: resourceType },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      Readable.from(buffer).pipe(stream);
    });
  }
  async uploadSingle(file: Express.Multer.File): Promise<any> {
    if (!file) throw new BadRequestException('No file provided');
    try {
      const resourceType = this.getResourceType(file.mimetype)
      const uploadfile = await this.uploadBufferToCloudinary(file.buffer, 'kchat', resourceType);
      return uploadfile?.url
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async deleteImage(key: string) {
  }

  getResourceType(mimetype: string) {
    const isImage = mimetype.startsWith('image')
    const isVideo = mimetype.startsWith('video')
    if (isImage) return 'image'
    if (isVideo) return 'video'
    return 'raw'
  }
}
