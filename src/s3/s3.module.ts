import {
  S3Client,
  S3ClientConfig
} from '@aws-sdk/client-s3';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3Controller } from './s3.controller';
import { S3Service } from './s3.service';

@Module({
  imports: [ConfigModule],
  controllers: [S3Controller],
  providers: [
    S3Service,
    {
      provide: S3Client,
      useFactory: (configService: ConfigService) => {
        const s3Config: S3ClientConfig = {
          region: configService.getOrThrow('AWS_REGION_KEY'),
          credentials: {
            accessKeyId: configService.getOrThrow('AWS_ACCESS_KEY_ID'),
            secretAccessKey: configService.getOrThrow('AWS_SECRET_ACCESS_KEY')
          }
        };
        return new S3Client(s3Config);
      },
      inject: [ConfigService]
    }
  ],
  exports: [S3Service]
})
export class S3Module { }