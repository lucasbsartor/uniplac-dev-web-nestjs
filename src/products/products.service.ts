import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    const product = await this.prismaService.product.create({
      data: { ...createProductDto },
    });
    return product;
  }

  async findAll() {
    const products = await this.prismaService.product.findMany({});
    return products;
  }

  async findOne(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const updatedProduct = await this.prismaService.product.update({
      where: { id },
      data: { ...updateProductDto },
    });
    return updatedProduct;
  }

  async remove(id: number) {
    await this.prismaService.product.delete({ where: { id } });
  }
}
