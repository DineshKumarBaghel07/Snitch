import {Router} from "express";
import  { authenticateSeller, authenticateUser } from "../middelware/auth.middelware.js";

import productValidator from "../validator/product.validator.js"
import { handleCreateProduct ,handleGetProductSeller,handleGetAllProducts,handleGetProductDetails,handleAddProductVariant} from "../controllers/product.controller.js";
import multer from "multer";
const productRouter = Router()

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
})

productRouter.post("/",authenticateSeller, upload.array("images",7),productValidator, handleCreateProduct )
productRouter.get("/seller",authenticateSeller,handleGetProductSeller)
productRouter.get("/get-all-products",handleGetAllProducts);
productRouter.get("/detail/:id",handleGetProductDetails)
productRouter.post("/:productId/variants",authenticateSeller,upload.array("images",7),handleAddProductVariant)

export default productRouter