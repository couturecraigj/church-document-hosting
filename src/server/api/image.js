import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const app = Router();
const cwd = process.cwd();

app.get('/:id/:width?', async (req, res) => {
  try {
    const user = await req.db.models.user.findOne({
      where: { id: req.params.id }
    });
    if (!user) throw new Error('No User');
    const image = await req.db.models.image.findOne({
      where: { id: user.imageId }
    });
    if (!image) throw new Error('No Image');
    if (!req.params.width)
      fs.createReadStream(path.join(cwd, image.location)).pipe(res);
    else
      fs.createReadStream(path.join(cwd, image.location))
        .pipe(sharp().resize(+req.params.width))
        .pipe(res);
  } catch (error) {
    res.send('NOTHING HERE');
  }
});

export default app;
