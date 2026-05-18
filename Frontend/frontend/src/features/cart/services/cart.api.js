import axios from "axios"


const cartApiInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true
})


export const addItem = async ({ productId, variantId }) => {
    const response = await cartApiInstance.post(`/api/cart/add/${productId}/${variantId}`, {
        quantity: 1
    })
  console.log(response.data)
    return response.data
}

export const getCart = async () => {
    const response = await cartApiInstance.get("/api/cart")
    return response.data
}

export const incrementCartItemApi = async ({ productId, variantId }) => {
    const response = await cartApiInstance.patch(`/api/cart/quantity/increment/${productId}/${variantId}`)
    return response.data
}

export const createCartOrder = async () => {
    const response = await cartApiInstance.post("/api/cart/payment/create/order")
    return response.data
}

export const verifyCartOrder = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
    const response = await cartApiInstance.post("/api/cart/payment/verify/order", {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    })

    return response.data
}