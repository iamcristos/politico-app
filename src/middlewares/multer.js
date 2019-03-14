import multer from 'multer'
import storage from '../config/cloudinary'

const multerStorage = multer({storage});

export default multerStorage;