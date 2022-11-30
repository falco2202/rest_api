import { validationResult } from "express-validator"

export const validationMiddleware = async(req, res, next) => {
        const error = validationResult(req)
        if(!error.isEmpty()) {
            return res.status(442).json({
                error: error.array()
            });
        }
        next();
}