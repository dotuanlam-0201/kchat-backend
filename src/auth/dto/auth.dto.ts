import { ApiProperty } from "@nestjs/swagger";

export class LoginDTO {
  @ApiProperty({ required: true, example: 'lam@icttm.net' })
  email: string
  @ApiProperty({ required: true, example: '123456' })
  password: string
}
