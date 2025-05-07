import { ApiProperty } from "@nestjs/swagger";

export class FileUploadDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'File to upload'
  })
  file: any;
}
export class FileUploadMultiDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary'
    },
    description: 'Files to upload'
  })
  file: any[]
}