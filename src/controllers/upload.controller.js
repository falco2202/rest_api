import uploadService from "../services/upload.service.js"

const uploadController = {
    uploadMultipleFile : (req, res) => {
        const arrayFileUpload = req.files
        // console.log(arrayFileUpload)
        try {
            res.status(201).send(uploadService.uploadMultipleFile(arrayFileUpload))
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

export default uploadController