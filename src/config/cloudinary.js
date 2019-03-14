import multer from 'multer'
import cloudinary from "cloudinary"
// const cloudinary = require('cloudinary')
import cloudinaryStorage from 'multer-storage-cloudinary'
import dotenv from 'dotenv'

dotenv.config()

// cloudinary.config({
//     cloud_name : process.env.cloud_name,
//     api_key : process.env.api_key,
//     api_secret : process.env.api_secret
// });
cloudinary.config({
    cloud_name : 'cristos',
    api_key : 625553475922246,
    api_secret : 'AW8LuKqWy3qAMKUSM2OCOZH5_Qw'
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "politico",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
});

export default storage;