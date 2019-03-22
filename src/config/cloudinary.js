import multer from 'multer'
import cloudinary from "cloudinary"
import cloudinaryStorage from 'multer-storage-cloudinary'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET
});


const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "politico",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
});

export default storage;