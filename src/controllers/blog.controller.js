import blogService from "../services/blog.service.js"

const blogController = {
    getAllBlog : (req, res) => {
        // search => sort => pagination
        const key = req.query.key
        const sortBy = req.query.sortBy
        const orderBy = req.query.orderBy || "asc"
        const page = req.query.page * 1 || 1
        const limit = req.query.limit * 1 || 5
        try {
            res
            .status(200)
            .send(blogService.getAllBlog(key, sortBy, orderBy, page, limit))
        } catch (error) {
            res.status(500).send(error)
        }
    },

    getAllBlogFromAuthorId : (req, res) => {
        const authorId = req.params.authorId
        const key = req.query.key
        const sortBy = req.query.sortBy
        const orderBy = req.query.orderBy || "asc"
        const page = req.query.page * 1 || 1
        const limit = req.query.limit * 1 || 5
        try {
            res
            .status(200)
            .send(blogService.getAllBlogFromAuthorId(authorId, key, sortBy, orderBy, page, limit))
        } catch (error) {
            res.status(500).send(error)
        }
    },

    getBlogFromId : (req, res) => {
        const id = req.params.id
        try {
            res
            .status(200)
            .send(blogService.getBlogFromId(id))
        } catch (error) {
            res.status(405).send(error)
        }
    },

    createBlog : (req, res) => {
        const authorId = req.query.authorId
        const infoBlog = req.body
        const videoPath = req.files["video"][0].path
        const imagePath = req.files["image"][0].path
        try {
            res
            .status(201)
            .send(blogService.createBlog(authorId, infoBlog, imagePath, videoPath))
        } catch (error) {
            res.status(500).send(error)
        }
    },

    updateBlog : (req, res) => {
        const id = req.query.id
        const updateInfo = req.body
        const image = req.files["image"][0].path
        const video = req.files["video"][0].path
        try {
            res
            .status(200)
            .send(blogService.updateBlog(id, updateInfo, image, video))
        } catch (error) {
            res.status(500).send(error)
        }
    },

    deleteBlog : (req, res) => {
        const id = req.params.id
        try {
            res
            .status(200)
            .send(blogService.deleteBlog(id))
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

export default blogController