import { config as dotenvConfig } from "dotenv";
dotenvConfig();

if(!process.env.PORT){
    throw new Error(`port not define in the envirement variable`)
}

if(!process.env.MONGO_URI){
    throw new Error(`mongo uri not define in the envirement variable`)
}

if(!process.env.JWT_SECERT){
    throw new Error("jwt secert not define")
}

if(!process.env.GOOGLE_CLIENT_ID){
    throw new Error("google client id not define")
}

if(!process.env.GOOGLE_SECERT)
{
    throw new Error("google secert not define")
}

if(!process.env.NODE_ENV){
    throw new Error("Development")
}

if(!process.env.IMAGEKIT_PRIVATE_KEY){
    throw new Error("ImageKit api not define.")
}
export const config ={
    port:process.env.PORT,
    mongo_uri:process.env.MONGO_URI,
    jwt_secert:process.env.JWT_SECERT,
    GOOGLE_CLIENT_ID :process.env.GOOGLE_CLIENT_ID,
    GOOGLE_SECERT:process.env.GOOGLE_SECERT,
    IMAGEKIT_PRIVATE_KEY:process.env.IMAGEKIT_PRIVATE_KEY,
    NODE_ENV:process.env.NODE_ENV || development
}