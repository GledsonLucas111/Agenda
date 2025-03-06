import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginRequestBody } from '../model/LoginRequestBody';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() { email, password }: LoginRequestBody) {
    return this.authService.login(email, password);
  }

  @Post('decoded')
  decoded(@Body() { token }: any) {
    return this.authService.decoded(token);
  }
}
