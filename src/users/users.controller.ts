import { Controller, Get, UseGuards } from '@nestjs/common';
import { Customer, Employee, User } from '@prisma/client';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  @Get('/me')
  getMe(@GetUser() user: User & { employee: Employee; customer: Customer }) {
    console.log(user);
    return user;
  }
}
