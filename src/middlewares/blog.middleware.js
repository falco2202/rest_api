import { body } from "express-validator"

export const checkBodyBlog = () => {
    return [
        body("title")
            .notEmpty().withMessage("Title cannot be emty!")
            .isLength({min: 10}).withMessage("Title must be at least 10 character"),
        body("subTitle")
            .notEmpty().withMessage("SubTitle cannot be emty!")
            .isLength({min: 10}).withMessage("SubTitle must be at least 10 character"),
        body("content")
            .notEmpty().withMessage("Content cannot be emty!")
            .isLength({min: 20}).withMessage("Content must be at least 20 character"),
        body("isPublic")
            .isBoolean()
    ]
}