import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({ required: true, example: "lam@icttm.net" })
  email: string;

  @ApiPropertyOptional()
  avatarURL?: string;

  @ApiPropertyOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({ example: 'Tuan Lam' })
  displayName?: string;
}

export class AuthenticationUserDTO extends UserDTO {
  @ApiProperty({ required: true, example: '123456' })
  password: string;
}

