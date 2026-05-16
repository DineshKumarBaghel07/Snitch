import { createToCart, getCartDetails } from "../dao/cart.dao.js";
import { findProduct, stockofVariant, } from "../dao/product.dao.js"
import cartModel from "../models/cart.model.js";

export const addToCart = async (req, res) => {
    try {
        const { productId, variantId } = req.params;
        const quantity = req.body.quantity;
        const userId = req.user._id

        const product = await findProduct(productId, variantId)

        if (!product) {
            return res.status(404).json({
                message: "product or variant not found",
                success: false,
            })
        }

        const stock = await stockofVariant(productId, varaintId);
        const cart = await createToCart(userId);
        const isAlreadyProductInCart = cart.items.find(item => item.product.toString() === productId && item.variant?.toString() === variantId)

        if (isAlreadyProductInCart) {
            const quantityInCart = cart.items.find(item => item.product.toString() === productId && item.variant?.toString() == variantId).quantity
            if (quantityInCart + quantity > stock) {
                return res.status(400).json({ message: `Only ${stock} items left in stock. and you already have ${quantityInCart} items in your cart`, success: false })
            }
            await cartModel.findOneAndUpdate(
                { user: req.user._id, "items.product": productId, "items.variant": variantId },
                { $inc: { "items.$.quantity": quantity } },
                { new: true }
            )

            return res.status(200).json({
                message: "Cart updated successfully",
                success: true
            })
        }
        if (quantity > stock) {
            return res.status(400).json({
                message: `Only ${stock} items left in stock`,
                success: false
            })
        }

        cart.items.push({
            product: productId,
            variant: variantId,
            quantity,
            price: product.price
        })

        await cart.save()

        return res.status(200).json({
            message: "Product added to cart successfully",
            success: true
        })


    } catch (error) {
        return res.status(500).json({ mesage: "Internal server error", success: false })
    }
}

export const getCart = async (req, res) => {
    const user = req.user
    let cart = await cartModel.findOne({ user: user._id }).populate("items.product")
    if (!cart) {
        const cart = await createToCart(user._id)
    }
    return res.status(200).json({
        message: "cart  fetched successfully",
        success: true,
        cart
    }

    )
}