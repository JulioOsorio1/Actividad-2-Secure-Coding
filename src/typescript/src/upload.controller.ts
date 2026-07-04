
import {
  Controller, Post, UploadedFile, UseInterceptors, BadRequestException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import * as path from 'path';


const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
]);


const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf']);
const MAX_FILE_SIZE = 5 * 1024 * 1024;


@Controller('files')
export class UploadController {
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: MAX_FILE_SIZE },  // limite de tamano en multer
  }))
  upload(@UploadedFile() file: Express.Multer.File): { filename: string } {
    if (!file) {
      throw new BadRequestException('No se recibio ningun archivo');
    }

    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      throw new BadRequestException(`Tipo de archivo no permitido: ${file.mimetype}`);
    }

    
    const ext = path.extname(file.originalname).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      throw new BadRequestException(`Extension no permitida: ${ext}`);
    }


    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException('Archivo demasiado grande');
    }
    
    const safeFilename = `${randomUUID()}${ext}`;
    return { filename: safeFilename };
  }
}
