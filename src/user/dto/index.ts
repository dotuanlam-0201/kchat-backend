import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({ required: true, example: "lam@icttm.net" })
  email: string;

  @ApiProperty({ required: true, example: '123456' })
  password: string;

  @ApiPropertyOptional()
  avatarURL?: string;

  @ApiPropertyOptional({ example: 'Tuan Lam' })
  displayName?: string;
}

