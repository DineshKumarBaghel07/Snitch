import { body, validationResult } from "express-validator";

const finalProductValidator = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      message: error.array(),
      success: false
    });
  }

  next();
};

const productValidator = [
  body("title").isString().withMessage("Title must be a string"),
  body("description").isString().withMessage("Description must be a string"),
  body("priceAmount").isNumeric().withMessage("Price must be a number"),
  body("currency").notEmpty().withMessage("Currency is required"),
  finalProductValidator
];

export default productValidator;