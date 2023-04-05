import {
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ImageService } from 'src/Services/image.service';
import path = require('path');
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

const storage = {
  storage: diskStorage({
    destination: './uploads/cocktails',
    filename: (_, file, cb) => {
      const filename: string = path.parse(file.originalname).name;
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@ApiTags('Images')
@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', storage))
  upload(@UploadedFile() file) {
    return { file: file.filename };
  }

  @ApiResponse({
    status: 200,
    description: 'Returns the image of the given cocktail',
    type: 'image',
  })
  @Get('/get')
  getCocktailPicture(@Res() res, @Query() query: { id: string }) {
    return this.imageService.getCocktailPicture(res, query);
  }
}
