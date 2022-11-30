import multer from "multer"
import { getDatePath, getDirPath } from "../helpers/handle.js"

const storageFile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, getDirPath(`src/data/uploads/${file.mimetype.split('/')[0]}s/${getDatePath(new Date())}/`))
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname}`
        cb(null, `${file.fieldname}-${uniqueSuffix}`)
    }
})

const fileFilter =(req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg|gif|svg|pdf|mp4|mov|avi)$/)) {
        req.fileValidationError = 'Only image or files are allowed!';
        return cb(null, false)
    }
    cb(null, true); 
}

const fileFilterImage = async(req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg|gif|svg|pdf)$/)) {
        req.fileValidationError = 'Only image are allowed!';
        return cb(null, false);
    }
    cb(null, true);
}

const upload = multer({storage: storageFile, fileFilter: fileFilter})
const uploadAvatar = multer({storage: storageFile, fileFilter: fileFilterImage})

const uploadImage = uploadAvatar.single("avatar")
export const uploadForUser = (req, res, next) => {
    uploadImage(req, res, () => {
        if(req.fileValidationError) {
            return res.send({
                code: 415,
                name: "Unsupported Media Type" 
            })
        } else if (!req.file) {
            return res.send('Please select an file to upload');
        } 
        next()
    })
}

const uploadBlog = upload.fields([{name: "image", maxCount: 1}, {name: "video", maxCount: 1}])
export const uploadForBlog = (req, res, next) => {
    uploadBlog(req, res, () => {
        if(req.fileValidationError) {
            return res.send({
                code: 415,
                name: "Unsupported Media Type" 
            })
        } else if (!req.files) {
            return res.send('Please select an file to upload');
        } 
        next()
    })
}

const uploadMultiFile = upload.array("files", 10) // no limit in file
export const uploadMultiple = (req, res, next) => {
    uploadMultiFile(req, res, (err) => {
        if(err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
            res.send("LIMIT_UNEXPECTED_FILE")
        }
        else if(req.fileValidationError) {
            return res.send({
                code: 415,
                name: "Unsupported Media Type" 
            })
        } else if (!req.files) {
            return res.send('Please select an file to upload');
        } 
        next()
    })
}

