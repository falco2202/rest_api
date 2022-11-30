import userService from "../services/user.service.js"

const userController = {
    getAllUser : (req, res) => {
        const key = req.query.key
        const sortBy = req.query.sortBy || "age"
        const orderBy = req.query.orderBy || "asc"
        const page = req.query.page || 1
        const limit = req.query.limit || 5 
        try {
            res.status(200).send(userService.getAllUser(key, sortBy, orderBy, page, limit));
        } catch (error) {
            res.status(500).send(error);
        }
    }, 

    getUser : (req, res) => {
        const id = req.params.id
        try {
            res 
                .status(200)
                .send(userService.getUser(id))
        } catch (error) {
            res.status(500).send(error)
        }
    },

    createUser : (req, res) => {
        const userInfo = req.body
        const avatar = req.file.path
        try {
            res
                .status(201)
                .send(userService.createUser(userInfo, avatar))
        } catch (error) {
            res.status(500).send(error)
        }
    },

    deleteUser : (req, res) => {
        const id = req.params.id
        try {
            res.send(userService.deleteBlog(id))
        } catch (error) {
            res.status(500).send(error)
        }
    },

    updateUser : (req, res) => {
        const id = req.query.id
        const updateInfo = req.body
        const avatar = req.file.path
        try {
            res.status(200).send(userService.updateUser(id, updateInfo, avatar))
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

export default userController;