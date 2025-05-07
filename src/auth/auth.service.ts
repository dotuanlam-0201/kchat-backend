import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from 'src/auth/dto/auth.dto';
import { throwInternalServerError } from 'src/lib/function/catchError';
import { AuthenticationUserDTO } from 'src/user/dto';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }
  async login(dto: LoginDTO) {
    try {
      const user = await this.userService.getUserByEmail(dto.email)
      if (!user) throw new UnauthorizedException()
      const isPasswordMatch = await bcrypt.compare(dto.password, user.password)
      if (!isPasswordMatch) throw new BadRequestException("Password wrong!")
      const payload = { ...user }
      const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' }
      )
      const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: '30d'
      })
      return { accessToken, refreshToken }
    } catch (error) {
      throwInternalServerError(error)
    }
  }
  async signup(dto: AuthenticationUserDTO) {
    return this.userService.addUser(dto)
  }
}
