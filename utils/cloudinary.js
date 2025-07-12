const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'media',
      allowed_formats: ["jpg", "jpeg", "png", "mp4", "webm"],
      transformation: [{ width: 800, crop: "limit" }],
      public_id: Date.now() + '-' + file.originalname.split('.')[0],
    }
  },
})

module.exports = { cloudinary, storage }
