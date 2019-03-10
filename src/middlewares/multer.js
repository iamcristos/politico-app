import multer from 'multer'
import storage from '../config/cloudinary'

const multerStorage = multer({storage})

// const parser = multerStorage.single('logourl')

export default multerStorage;