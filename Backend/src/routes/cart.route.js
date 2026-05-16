import express from "express";
import { authenticateUser } from "../middelware/auth.middelware.js";
import validateAddToCart from "../validator/cart.validator.js";
import { addToCart,getCart } from "../controllers/cart.controller.js";
const cartRouter = express.Router();


cartRouter.post("add/productId/:variantId",authenticateUser,validateAddToCart,addToCart);
cartRouter.get("/",authenticateUser,getCart)


export default cartRouter;