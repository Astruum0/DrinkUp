import {
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ImageService } from 'src/Services/image.service';
import path = require('path');

@ApiTags('Images')
@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('/upload')
  upload(@UploadedFile() file) {
    return this.imageService.upload(file);
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
