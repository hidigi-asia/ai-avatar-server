import {
  Body,
  Controller,
  Get,
  NotAcceptableException,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { MeDto } from './dto/me.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.identifier, loginDto.password);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto.email, registerDto.password);
  }

  // Verify activation code from query string
  @Post('activate')
  async activate(@Query('code') code: string, @Res() res) {
    // var redirectUrl = this.configService.get('SERVER_URL');
    var redirectUrl = 'http://localhost:5173';

    var user = await this.authService.activate(code);

    if (!user) {
      throw new NotAcceptableException(
        'Invalid activation code or the code has expired',
      );
    }

    return res.redirect(redirectUrl);
  }

  @Post('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async me(@Body() meDto: MeDto) {
    return this.authService.me(meDto.id);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    var result = await this.authService.loginGoogle(
      req.user.email,
      req.user.password,
    );

    var token = result.accessToken;

    res.redirect('http://localhost:5173/oauth2/callback?accessToken=' + token);
  }
}
