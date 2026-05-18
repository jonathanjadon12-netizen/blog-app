import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage(),
  //to avoid RAM overflow
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
  //for security validation
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const err = new Error("Only JPG, PNG, and WEBP images are allowed");
      err.status = 400;
      cb(err, false);
    }
  },
});
