import { body, param, validationResult } from "express-validator";

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: "validation error",
             errors: errors.array(),
              success: false
             })
    }
    next()
}

export const validateAddToCart = [
     body("quantity").isNumeric().withMessage("quantity must be a number"),
     param("productId").isMongoId().withMessage("Invalid product id"),
     param("variantId").isMongoId().withMessage("invalid variant id"),
     validateResult
]

export const validateIncrementCartItemQuantity = [
    param("productId").isMongoId().withMessage("Invalid product ID"),
    param("variantId").optional().isMongoId().withMessage("Invalid variant ID"),
    validateResult
]
