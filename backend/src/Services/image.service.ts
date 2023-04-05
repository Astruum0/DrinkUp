import { Injectable, Query, Res } from '@nestjs/common';

@Injectable()
export class ImageService {
  getCocktailPicture(@Res() res, @Query() query: { id: string }) {
    const extensions = ['.png', '.jpg', '.jpeg', '.gif'];

    extensions.forEach((extension) => {
      try {
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
      } catch (err) {
        console.log(err);
      }
    });
  }
}
