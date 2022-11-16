import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CustomersModule } from './customers/customers.module';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ImagesModule } from './images/images.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'images'),
      serveRoot: '/images',
    }),
    PrismaModule,
    CustomersModule,
    EmployeesModule,
    ProductsModule,
    AuthModule,
    ImagesModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
