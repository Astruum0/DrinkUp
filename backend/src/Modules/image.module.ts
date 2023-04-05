import { Module } from '@nestjs/common';
import { ImageController } from 'src/Controllers/image.controller';
import { ImageService } from 'src/Services/image.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
