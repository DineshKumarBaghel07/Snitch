import mongoose from "mongoose";
import { config } from "./config.js";

const dbConnection = async() =>{
  try{
    await mongoose.connect(config.mongo_uri)
    console.log("Database connection sucessfully")
  }catch(error){
    console.log(`${error.message}`)
  }
}

export default dbConnection