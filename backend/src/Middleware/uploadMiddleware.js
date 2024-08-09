const multer = require('multer');
const { diskStorage } = require('multer');
const path = require('path');
const fs = require('fs');

const re = new RegExp("\\s+", "g");
const sanitizeFileName = (imageName) => {
  return imageName.replace(re, "-").replace(/[^a-zA-Z0-9_\-\.]/g, "");
};

const filename = (req, file, cb) => {
  let lastDotIndex = file.originalname.lastIndexOf(".");
  let originalname = file.originalname.substring(0, lastDotIndex);
  let ext = file.originalname.substring(lastDotIndex);
  cb(null, `${sanitizeFileName(originalname)}-${Date.now()}${ext}`);
};

const filter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "video/mp4",
    "image/gif",
    "application/pdf",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg, .png, .mp4, .gif, and .pdf formats allowed!"));
  }
};

const getDestination = (folderName) => {
  return (req, file, cb) => {
    const uploadPath = path.join(__dirname, `../../uploads/${folderName}`);
    console.log(`Upload path: ${uploadPath}`); // Debug log
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
      console.log(`Created directory: ${uploadPath}`); // Debug log
    }
    cb(null, uploadPath);
  };
};


const profileImageStorage = diskStorage({
  destination: getDestination("profiles"),
  filename,
});

const productImageStorage = diskStorage({
  destination: getDestination("products"),
  filename,
});

const profileImage = multer({
  storage: profileImageStorage,
  fileFilter: filter,
});

const productImage = multer({
  storage: productImageStorage,
  fileFilter: filter,
});

module.exports = {
  profileImage,
  productImage,
};
