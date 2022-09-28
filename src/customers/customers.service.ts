import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prismaService: PrismaService) {}
  async create(createCustomerDto: CreateCustomerDto, user: User) {
    const customer = await this.prismaService.customer.create({
      data: { ...createCustomerDto, userId: user.id },
    });
    return customer;
  }

  async findAll() {
    const customers = await this.prismaService.customer.findMany({});
    return customers;
  }

  async findOne(id: number) {
    const customer = await this.prismaService.customer.findUnique({
      where: { id },
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
