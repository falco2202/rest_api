import express from "express";
import uploadController from "../controllers/upload.controller.js";
import { uploadMultiple } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/", uploadMultiple, uploadController.uploadMultipleFile)

export default router