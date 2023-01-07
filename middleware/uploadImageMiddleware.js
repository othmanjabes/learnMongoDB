const multer = require("multer");

const ApiError = require("../utils/ApiError");

exports.uploadSingleImage = (fieldName) => {
    console.log('Print: -> ');

  const memoryStorage = multer.memoryStorage();

  const multerFilter = function (res, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("Only images allowed", 400), false);
    }
  };
  const upload = multer({ storage: memoryStorage, fileFilter: multerFilter });
  return upload.single(fieldName);
};
