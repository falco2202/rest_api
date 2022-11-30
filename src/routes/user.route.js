import express from "express";

import userController from "../controllers/user.controller.js";
import blogController from "../controllers/blog.controller.js";
import { validationMiddleware } from "../middlewares/base.middleware.js";
import { checkBodyUser } from "../middlewares/user.middlewware.js";
import { uploadForUser } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/:id", userController.getUser)
router.get("/", userController.getAllUser)
router.get("/:authorId/blogs", blogController.getAllBlogFromAuthorId)
router.post("/", uploadForUser, checkBodyUser(), validationMiddleware, userController.createUser)
router.delete("/:id", userController.deleteUser)
router.put("/", uploadForUser, checkBodyUser(), validationMiddleware, userController.updateUser)

export default router