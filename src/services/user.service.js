import { v4 as uuidv4 } from "uuid";
import { readListFromJsonFile, writeListToJsonFile } from "../helpers/handle.js";
import { pagination, sort } from "../libraries/features.js";
import { configPathFile } from "../helpers/handle.js";

const PATH_USER = "./src/data/users.json"
let users = readListFromJsonFile(PATH_USER)

const userService = {
    getAllUser : (key, sortBy, orderBy, page, limit) => {
        let listUser = users
        if (key) {
            const re = new RegExp(`${key}`, "ig")
            listUser = listUser.filter((user) => {
                return re.test(user.fullName) || re.test(user.email) || re.test(user.address)
            })
        }

        if(sortBy) {
            sort(listUser, "user", sortBy, orderBy)
        }

        const result = pagination(listUser, page, limit)
        return result
    },

    getUser : (id) => {
        const findUser = users.find(user => user.id === id)
        if(!findUser)
            return "User not found!"
        return findUser
    },

    // Chọn ảnh để gửi req => sửa tên => đưa vào thư mục xem ngày hiện tại có k => k tạo thư mục rồi đưa vào thôi
    createUser : (infoUser, avatar) => {
        let { fullName, email, age, address } = infoUser
        age = age * 1
        // console.log(age, address)
        const listUser = users
        const checkEmailIsExist = listUser.find(user => user.email === email)
        if (checkEmailIsExist)
            return "Email is exist!"
        users.push({
            "id": uuidv4(),
            "fullName": fullName,
            "email": email,
            "age": age,
            "address": address,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "avatar": configPathFile(avatar)
        })
        writeListToJsonFile(PATH_USER, users);
        return `Create user ${fullName} successful!`
    },

    deleteUser : (id) => {
        const findUser = users.find(user => user.id === id)
        if(!findUser)
            return "User does not exist!"
        users = users.filter(user => user.id !== id)
        writeListToJsonFile(PATH_USER, users)
        return `${findUser.fullName} deleted`
    },

    updateUser : (id, updateInfo, avatar) => {
        const user = users.find(user => user.id === id)
        if(!user)
            return "User does not exist!"
        if(updateInfo.fullName) {
            user.fullName = updateInfo.fullName
        }
        if(updateInfo.email) {
            user.email = updateInfo.email
        }
        if(updateInfo.age) {
            user.age = updateInfo.age * 1
        }
        if(updateInfo.address) {
            user.address = updateInfo.address
        }
        if(avatar){
            user.avatar = configPathFile(avatar)
        }
        user.updatedAt = new Date()
        writeListToJsonFile(PATH_USER, users)
        return user
    }
}

export default userService;