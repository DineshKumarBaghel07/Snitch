import express from "express";
import { authenticateUser } from "../middelware/auth.middelware.js";
import {validateAddToCart, validateIncrementCartItemQuantity} from "../validator/cart.validator.js";
import { addToCart,getCart, incrementCartItemQuantity } from "../controllers/cart.controller.js";
const cartRouter = express.Router();


cartRouter.post("/add/:productId/:variantId",authenticateUser,validateAddToCart,addToCart);
cartRouter.get("/",authenticateUser,getCart)

cartRouter.patch("/quantity/increment/:productId/:variantId", authenticateUser, validateIncrementCartItemQuantity, incrementCartItemQuantity)



export default cartRouter;