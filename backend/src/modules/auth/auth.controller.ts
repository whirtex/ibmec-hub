import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register-company')
  async registerCompany(@Body() body: any) {
    return this.authService.registerCompany(body);
  }

  @Get('me')
  async getMe(@Request() req: any) {
    // TODO: Implement JWT guard
    return this.authService.getMe(req.user?.id);
  }
}
