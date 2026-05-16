import mongoose from "mongoose";
import priceSchema from "./price.schema.js";

const productSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    images: [
        {
            url: {
                type: String,
                required: true
            }
        }
    ],
    price: {
       type:priceSchema,
       required: true
    },
    variants: [
        {
            images: [
                {
                    url: {
                        type: String,
                        required: true
                    }
                }
            ],
            stock: {
                type: Number,
                required: true
            },
            attribute: {
                type: Map,
                of: String
            },
            price:{
               type:priceSchema,
               required:true
            }
        }
    ]
}, { timestamps: true })



const productModel = mongoose.model("product", productSchema);




export default productModel;