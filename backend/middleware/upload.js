const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Crear directorios si no existen
const uploadDirs = ['uploads/images', 'uploads/videos', 'uploads/avatars'];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, 'uploads/images');
    } else if (file.mimetype.startsWith('video/')) {
      cb(null, 'uploads/videos');
    } else {
      cb(null, 'uploads');
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Filtro de archivos
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = /jpeg|jpg|png|gif|webp/;
  const allowedVideoTypes = /mp4|webm|mov|avi/;
  
  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (mimetype.startsWith('image/') && allowedImageTypes.test(extname.slice(1))) {
    cb(null, true);
  } else if (mimetype.startsWith('video/') && allowedVideoTypes.test(extname.slice(1))) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido'));
  }
};

// Límites
const limits = {
  fileSize: 500 * 1024 * 1024 // 500MB máximo
};

const upload = multer({
  storage,
  fileFilter,
  limits
});

module.exports = upload;
