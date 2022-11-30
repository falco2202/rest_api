import { configPathFile, writeListToJsonFile, readListFromJsonFile } from "../helpers/handle.js";

const PATH_FILE_UPLOAD = "./src/data/uploads.json"
let uploadFiles = readListFromJsonFile(PATH_FILE_UPLOAD)

const uploadService = {
    uploadMultipleFile : (uploadMultipleFile) => {
        uploadMultipleFile = uploadMultipleFile.map(file => {
            return configPathFile(file.path)
        });
        uploadFiles.push(uploadMultipleFile)
        writeListToJsonFile(PATH_FILE_UPLOAD, uploadFiles)
        return uploadMultipleFile
    }
}

export default uploadService