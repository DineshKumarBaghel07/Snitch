import axios from "axios";

const productApiInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
})

export async function createProduct(formData) {
    const response = await productApiInstance.post("/api/products", formData)

    return response.data
}

export async function getSellerProduct() {
    const response = await productApiInstance.get("/api/products/seller")
    return response.data
}

export async function getAllProducts() {
    const response = await productApiInstance.get("/api/products/get-all-products")
    return response.data
}

export async function getProductById(productId) {
    const response = await productApiInstance.get(`/api/products/detail/${productId}`)
    console.log("this product come by the id",response.data)
    return response.data
}

export async function addProductVariant(productId, newProductVariant) {

    console.log(newProductVariant)

    const formData = new FormData()

    newProductVariant.images.forEach((image) => {
        formData.append(`images`, image.file)
    })

    formData.append("stock", newProductVariant.stock)
    formData.append("priceAmount", newProductVariant.price)
    formData.append("attributes", JSON.stringify(newProductVariant.attributes))

    const response = await productApiInstance.post(`/api/products/${productId}/variants`, formData)

    return response.data

}