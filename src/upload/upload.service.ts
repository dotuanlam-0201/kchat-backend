import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as Cloudinary, UploadApiResponse } from 'cloudinary';
import { throwInternalServerError } from 'src/lib/function/catchError';
import * as streamifier from 'streamifier';


@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {
    Cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
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
      streamifier.createReadStream(buffer).pipe(stream);
      // Readable.from(buffer).pipe(stream);
    });
  }
  async uploadSingle(file: Express.Multer.File): Promise<any> {
    if (!file) throw new BadRequestException('No file provided');
    try {
      const resourceType = this.getResourceType(file.mimetype)
      const uploadfile = await this.uploadBufferToCloudinary(file.buffer, 'kchat', resourceType);
      return uploadfile?.secure_url
    } catch (error) {
      throwInternalServerError(error)
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
