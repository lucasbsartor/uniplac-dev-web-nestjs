import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CustomersModule } from './customers/customers.module';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [PrismaModule, CustomersModule, EmployeesModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
