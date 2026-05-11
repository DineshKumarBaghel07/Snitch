import ImageKit from "@imagekit/nodejs";
import { config } from "../config/config.js";


const client = new ImageKit({
    privateKey:config.IMAGEKIT_PRIVATE_KEY
})


export const uploadFile = async ({buffer,fileName}) => {
    
    try{
        const result = await client.files.upload({
        file: await ImageKit.toFile(buffer),
        fileName,
        folder:"images"
        })

    return result
    }catch(err){
       throw err.message
    }
}