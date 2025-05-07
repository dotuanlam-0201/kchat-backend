import { Controller, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.guard';
import { FileUploadDto } from 'upload/dto/upload.dto';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Public()
  @Post('/single')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    type: FileUploadDto,
  })
  uploadSingle(@UploadedFile(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: new RegExp('[a-zA-Z0-9]+\.(png|jpeg|jpg)'),
      })
      .addMaxSizeValidator({
        maxSize: 1024 * 1024 * 3
      })
      .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
      }),
  ) file: Express.Multer.File) {
    return this.uploadService.uploadSingle(file)
  }
}
