import mongoose from "mongoose";
import priceSchema from "./price.schema.js";

const carrtSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true

    },
    items:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"product",
                required:true
            },
            quantity:{
                type:Number,
                default:1,
                required:true,
                min:1
            },
            price:{
               type:priceSchema,
               required:true
            },
            variant:{
                type:mongoose.Schema.Types.ObjectId,
                required:true
            }
        }
    ]
},{
    timestamps: true
})


const cartModel = mongoose.model("carts", carrtSchema);


export default cartModel;