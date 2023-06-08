import { NextFunction, Request, Response } from 'express';
import { UploadApiResponse, v2 } from 'cloudinary';
import { config } from 'dotenv';
const streamifier = require('streamifier');

config();
v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadToCloud = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.file);
  console.log(req.files);

  const streamUpload = async (req: Request) => {
    return new Promise((resolve, reject) => {
      const stream = v2.uploader.upload_stream(
        (error, result: UploadApiResponse) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        },
      );
      streamifier.createReadStream(req?.file.buffer).pipe(stream);
    });
  };
  try {
    const result = (await streamUpload(req)) as UploadApiResponse;
    return res.json({ url: result.url });
  } catch (error) {
    console.log(error);
  }
};
