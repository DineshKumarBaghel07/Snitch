import mongoose from "mongoose";

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
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            default: "INR",
            enum: ["USD", "INR"]
        }
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
                amount:{
                    type:Number,
                    required:true
                },
                currency:{
                    type:String,
                    default:"INR",
                    enum:["USD","INR"]
                }
            }
        }
    ]
}, { timestamps: true })



const productModel = mongoose.model("product", productSchema);




export default productModel;