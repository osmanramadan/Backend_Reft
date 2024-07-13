import multer, { memoryStorage } from 'multer';
import { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

export default class uploadImageController {
  uploadMultiImage() {
    const multerStorage = memoryStorage();

    const multerFilter = (_req: any, file: any, cb: any) => {
      if (file.mimetype.startsWith('image')) {
        cb(null, true);
      } else if (file.mimetype.startsWith('application/pdf')) {
        cb(null, true);
      } else if (file.mimetype.startsWith('video/mp4')) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };

    const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

    return upload.fields([
      { name: 'images', maxCount: 3 },
      { name: 'imageCover', maxCount: 1 },
      { name: 'pdf', maxCount: 1 },
      { name: 'video', maxCount: 1 }
    ]);
  }

  uploadMultimages = this.uploadMultiImage();

  resizeimage = async (req: Request, res: Response, next: any) => {
    try {
      if (!req.files && !req.file) {
        res.json({ status: 'upload error' });
        return;
      }

      const pathimg = path.resolve(__dirname, `../../uploads/halls`);
      const pathPdf = path.resolve(__dirname, `../../uploads/pdfs`);
      const pathVideo = path.resolve(__dirname, `../../uploads/videos`);

      // @ts-ignore
      if (req.files && req.files.video && req.files.video[0]) {
        req.body.video = ' videoFilename';
        // @ts-ignore
        const extVideo = req.files.video[0].mimetype.split('/')[1];
        const videoFilename = `video-${uuidv4()}-${Date.now()}.${extVideo}`;
        console.log(videoFilename);
        // @ts-ignore
        await fs.promises.writeFile(
          path.resolve(pathVideo, videoFilename),
          // @ts-ignore
          req.files.video[0].buffer
        );

        req.body.video = videoFilename;
      }

      // @ts-ignore
      if (req.files.pdf) {
        // @ts-ignore
        const extPdf = req.files.pdf[0].mimetype.split('/')[1];
        const pdfFilename = `pdf-${uuidv4()}-${Date.now()}.${extPdf}`;

        // @ts-ignore
        const pdfBytes = req.files.pdf[0].buffer;
        const pdfDoc = await PDFDocument.load(pdfBytes);

        const modifiedPdfBytes = await pdfDoc.save();

        await fs.promises.writeFile(
          path.resolve(pathPdf, pdfFilename),
          modifiedPdfBytes
        );

        req.body.pdf = pdfFilename;
      }

      // @ts-ignore
      if (req.files.imageCover) {
        // @ts-ignore
        const ext = req.files.imageCover[0].mimetype.split('/')[1];
        const imageCoverFilename = `halls-${uuidv4()}-${Date.now()}-cover.${ext}`;
        // @ts-ignore
        await sharp(req.files.imageCover[0].buffer).toFile(
          path.resolve(pathimg, `${imageCoverFilename}`)
        );

        req.body.imageCover = imageCoverFilename;
      }

      req.body.images = [];

      // @ts-ignore
      if (req.files.images) {
        await Promise.all(
          // @ts-ignore
          req.files.images.map(async (img, index) => {
            const ext = img.mimetype.split('/')[1];
            const filename = `halls-${uuidv4()}-${Date.now()}-${
              index + 1
            }.${ext}`;

            await sharp(img.buffer).toFile(
              path.resolve(pathimg, `${filename}`)
            );

            req.body.images.push(filename);
          })
        );
      }
      next();
    } catch (err) {
      res.status(400);
      console.log(err);
      res.json({ status: 'fail' });
      return;
    }
  };
}
