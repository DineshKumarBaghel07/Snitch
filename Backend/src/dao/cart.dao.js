import cartModel from "../models/cart.model.js"

export const createToCart = async (userId) => {
        const cart = (await cartModel.findOne({user:userId})) || (await cartModel.create({user:userId}))
        return cart;
}


