import { body } from "express-validator"

export const checkBodyUser = () => {
    return [
        body("fullName")
            .isString().withMessage("Full name used only string")
            .isLength({min:3, max:50}).withMessage("Full name too short or too long."),
        body("email")
            .isEmail().withMessage("Invalid email.")
            .isLength({min:7}).withMessage("Email too short."),  
        body("age")
            .isInt().withMessage("Please enter only number"),
        body("address")
            .isString().withMessage("Invalid address")
            .isLength({min:10}).withMessage("Address too short")
    ]
}