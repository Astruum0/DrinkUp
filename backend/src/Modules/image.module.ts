import { Module } from '@nestjs/common';
import { ImageController } from 'src/Controllers/image.controller';
import { ImageService } from 'src/Services/image.service';

@Module({
  imports: [],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
