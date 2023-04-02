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
import { NextFunction } from 'express';

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

@Injectable()
export class ImageService {
  @UseInterceptors(FileInterceptor('file', storage))
  upload(@UploadedFile() file) {
    return { file: file.filename };
  }

  getCocktailPicture(@Res() res, @Query() query: { id: string }) {
    const extensions = ['.png', '.jpg', '.jpeg', '.gif'];

    extensions.forEach((extension) => {
      res.sendFile(
        `${query.id + extension}`,
        {
          root: '../uploads/cocktails',
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
