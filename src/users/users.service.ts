import { Injectable, NotFoundException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dtos/UpdateUser.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  async findAll() {
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        cpf: true,
        phone: true,
        updatedAt: true,
        createdAt: true,
        customer: true,
        employee: true,
      },
    });
    return users;
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        cpf: true,
        phone: true,
        updatedAt: true,
        createdAt: true,
        customer: true,
        employee: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (updateUserDto.password) {
      const hashedPassord = await argon2.hash(updateUserDto.password);
      updateUserDto.password = hashedPassord;
    }
    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
    return updatedUser;
  }
}
