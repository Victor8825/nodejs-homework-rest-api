const path = require("path");
const multer = require("multer");

const tmpDir = path.join(process.cwd(), "tmp");
const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: { fileSize: 2000000 },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = {
  upload,
};
