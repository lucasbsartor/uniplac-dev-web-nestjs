import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as cuid from 'cuid';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { promises as fs } from 'fs';

@UseGuards(JwtAuthGuard)
@Controller('images')
export class ImagesController {
  @Get()
  async getAllFileNames() {
    const files = await fs.readdir(path.resolve('./images'));
    return files;
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images',
        filename: (req, file, callback) => {
          const newFilename = `${cuid()}${path.extname(file.originalname)}`;
          return callback(null, newFilename);
        },
      }),
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return {
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype,
      destination: file.destination,
      filename: file.filename,
      path: file.path,
      size: file.size,
    };
  }
}
