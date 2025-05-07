import { Module } from '@nestjs/common';
import { S3Module } from 'src/s3/s3.module';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [S3Module]
})
export class UploadModule { }
