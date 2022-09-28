import * as argon2 from 'argon2';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './dtos/signUp.dto';
import { Prisma, User } from '@prisma/client';
import { SignInDto } from './dtos/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      const hashedPassword = await argon2.hash(signUpDto.password);
      const user = await this.prismaService.user.create({
        data: {
          email: signUpDto.email,
          password: hashedPassword,
          cpf: signUpDto.cpf,
          name: signUpDto.name,
          phone: signUpDto.phone,
        },
      });

      return this.signJwt(user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials already taken');
        }
      }
      throw error;
    }
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: signInDto.email },
    });
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    if (!(await argon2.verify(user.password, signInDto.password))) {
      throw new ForbiddenException('Invalid credentials');
    }
    return this.signJwt(user);
  }

  async signJwt(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_EXPIRES_IN'),
      secret: this.configService.get('JWT_SECRET'),
    });

    return {
      access_token: token,
    };
  }
}
