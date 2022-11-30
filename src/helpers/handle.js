import fs from "fs"

export const readListFromJsonFile = (path) => {
    try {
        const data = fs.readFileSync(path, "utf-8");
        return data ? JSON.parse(data) : []
    } catch (error) {
        console.log(error);
    }
}

export const writeListToJsonFile = (path, data) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
}

export const getDatePath = (date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`
}

export const getDirPath = (dirPath) => {
    try {
        if(!fs.existsSync(dirPath)) 
            fs.promises.mkdir(dirPath, {recursive: true})
        return dirPath
    } catch (error) {
        console.log(error)
    }
}

export const configPathFile = (pathFile) => {
    return pathFile.split("\\").join("/")
}