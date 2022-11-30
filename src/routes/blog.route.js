import express from "express"
import blogController from "../controllers/blog.controller.js"
import { validationMiddleware } from "../middlewares/base.middleware.js"
import { checkBodyBlog } from "../middlewares/blog.middleware.js"
import { uploadForBlog } from "../middlewares/upload.middleware.js"

const router = express.Router()

router.get("/:id", blogController.getBlogFromId)
router.get("/", blogController.getAllBlog)
router.post("/", uploadForBlog, checkBodyBlog(), validationMiddleware, blogController.createBlog)
router.delete("/:id", blogController.deleteBlog)
router.put("/:id", uploadForBlog, checkBodyBlog(), validationMiddleware, blogController.updateBlog)

export default router