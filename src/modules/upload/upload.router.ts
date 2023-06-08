import { Router } from 'express';
import multer from 'multer';

const UploadRouter = Router();
import { uploadToCloud } from './upload.controller';

const memoryStorage = multer.memoryStorage();

const uploadWithMemory = multer({ storage: memoryStorage });

UploadRouter.post('/', uploadWithMemory.single('file'), uploadToCloud);

export default UploadRouter;
