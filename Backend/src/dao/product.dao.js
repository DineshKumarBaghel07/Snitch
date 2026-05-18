import productModel from "../models/product.model.js";


export const findProduct = async (productId, variantId) => {
    
    const product = await productModel.findOne({
        _id: productId,
        "variants._id": variantId
    })

    return product;
}

export const stockofVariant = async (productId, variantId) => {
    const product = await findProduct(productId, variantId);
    const stock = product.variants.find(variant => variant._id.toString() === variantId).stock
    
   
    return stock
}