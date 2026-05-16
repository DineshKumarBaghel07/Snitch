import productModel from "../models/product.model.js";


export const findProduct = async (productId, variantId) => {
    const product = await productModel.findOne({
        _id: productId,
        "variatns._id": variantId
    })

    return product;
}

export const stockofVariant = async (productId, variantId) => {
    const product = findProduct(productId, variantid);
    const stock = product.variatns.find(variant => variant._id.toString() === variantId).stock
    return stock
}