import { diskStorage } from 'multer';
import {
  Injectable,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import path = require('path');

@Injectable()
export class ImageService {
  getCocktailPicture(@Res() res, @Query() query: { id: string }) {
    const extensions = ['.png', '.jpg', '.jpeg', '.gif'];

    extensions.forEach((extension) => {
      res.sendFile(
        `${query.id + extension}`,
        {
          root: 'uploads/cocktails',
        },
        function (err) {
          if (!err) {
            console.log('Sent:', `${query.id + extension}`);
          }
        },
      );
    });
  }
}
