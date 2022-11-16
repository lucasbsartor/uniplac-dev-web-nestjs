import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ImagesController } from './images.controller';

@Module({
  imports: [MulterModule.register({ dest: './images' })],
  controllers: [ImagesController],
})
export class ImagesModule {}
