import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private prismaService: PrismaService) {}
  async create(createEmployeeDto: CreateEmployeeDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id: createEmployeeDto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const employee = await this.prismaService.employee.create({
      data: {
        ...createEmployeeDto,
      },
    });
    return employee;
  }

  async findAll() {
    const employees = await this.prismaService.employee.findMany({});
    return employees;
  }

  async findOne(id: number) {
    const employee = await this.prismaService.employee.findUnique({
      where: { id },
    });
    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.prismaService.employee.findUnique({
      where: { id },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    const updatedEmployee = await this.prismaService.employee.update({
      where: { id },
      data: { ...updateEmployeeDto },
    });
    return updatedEmployee;
  }

  async remove(id: number) {
    await this.prismaService.employee.delete({ where: { id } });
  }
}
