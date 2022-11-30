import { readListFromJsonFile } from "./handle.js";

const PATH_USER = "./src/data/users.json"

let users = readListFromJsonFile(PATH_USER)

export const findUserByEmail = (value) => {
    users.find(user => user.email === value)
}