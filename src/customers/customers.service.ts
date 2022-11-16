import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prismaService: PrismaService) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id: createCustomerDto.userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const customer = await this.prismaService.customer.create({
      data: { ...createCustomerDto },
    });
    return customer;
  }

  async findAll() {
    const customers = await this.prismaService.customer.findMany({
      include: {
        user: {
          select: { id: true, email: true, name: true, cpf: true, phone: true },
        },
      },
    });
    return customers;
  }

  async findOne(id: number) {
    const customer = await this.prismaService.customer.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, email: true, name: true, cpf: true, phone: true },
        },
      },
    });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.prismaService.customer.findUnique({
      where: { id },
    });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    const updatedCustomer = await this.prismaService.customer.update({
      where: { id },
      data: { ...updateCustomerDto },
    });
    return updatedCustomer;
  }

  async remove(id: number) {
    await this.prismaService.customer.delete({ where: { id } });
  }
}
