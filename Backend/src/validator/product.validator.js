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

  body("title")
    .isString()
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .isString()
    .notEmpty()
    .withMessage("Description is required"),

  body("priceAmount")
    .isNumeric()
    .withMessage("Price must be a number"),

  body("currency")
    .notEmpty()
    .withMessage("Currency is required"),

  body("stock")
    .isNumeric()
    .withMessage("Stock must be a number"),

  body("attributes")
    .optional()
    .isString()
    .withMessage("Attributes must be JSON string"),

  finalProductValidator
];

export default productValidator;