import { PrismaService } from '@/prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  async login(identifier: string, password: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: identifier,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid password');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User is not activated');
    }

    const payload = { email: user.email, sub: user.id };

    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
    };
  }

  async register(email: string, password: string) {
    var user = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const userToCreate = {
      email: email,
      password,
    };

    user = await this.prismaService.user.create({
      data: userToCreate,
    });

    const activationPayload = {
      userId: user.id,
    };

    const activationToken = this.jwtService.sign(activationPayload, {
      expiresIn: '1h',
    });

    const verification_link =
      // this.configService.get<string>('SERVER_URL') +
      'http://localhost:5173' + '/activate?code=' + activationToken;

    var body = `<html>
      <head>
          <style>
              body {{
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }}
              .container {{
                  width: 100%;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }}
              .header {{
                  background-color: #4CAF50;
                  color: white;
                  padding: 10px 0;
                  text-align: center;
                  border-top-left-radius: 8px;
                  border-top-right-radius: 8px;
              }}
              .content {{
                  padding: 20px;
              }}
              .content p {{
                  font-size: 16px;
                  color: #333333;
              }}
              .content a {{
                  display: inline-block;
                  margin-top: 20px;
                  padding: 10px 20px;
                  color: white;
                  background-color: #4CAF50;
                  text-decoration: none;
                  border-radius: 4px;
              }}
              .footer {{
                  margin-top: 20px;
                  text-align: center;
                  font-size: 12px;
                  color: #999999;
              }}
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h2>Email Verification</h2>
              </div>
              <div class="content">
                  <p>Hello,</p>
                  <p>Thank you for registering. Please verify your email address by clicking the link below:</p>
                  <a href="${verification_link}">Verify Email</a>
              </div>
              <div class="footer">
                  <p>If you did not request this email, please ignore it.</p>
              </div>
          </div>
      </body>
      </html>`;

    await this.mailService.sendMail(user.email, 'HiDigi Support', body);

    return user;
  }

  async activate(code: string) {
    const activationPayload = this.jwtService.verify(code);

    const user = await this.prismaService.user.findUnique({
      where: {
        id: activationPayload.userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.isActive = true;

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        isActive: true,
      },
    });

    return user;
  }

  async loginGoogle(identifier: string, password: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { username: user.username, sub: user.id };

    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
    };
  }

  async me(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async validateGoogleUser(user: any) {
    let existingUser = await this.prismaService.user.findUnique({
      where: { email: user.email },
    });

    if (!existingUser) {
      existingUser = await this.prismaService.user.create({
        data: {
          email: user.email,
          password: 'password',
        },
      });
    }
    return existingUser;
  }
}
