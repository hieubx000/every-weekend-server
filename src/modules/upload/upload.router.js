const router = require('express').Router();
const multer = require('multer');
const { uploadToCloud } = require('./upload.controller');

const memoryStorage = multer.memoryStorage();

const uploadWithMemory = multer({ storage: memoryStorage })

router.post('/', uploadWithMemory.single('file'), uploadToCloud)

module.exports = router