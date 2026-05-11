import {app} from './src/app.js'
import {config} from "./src/config/config.js"
import dbConnection from './src/config/db.js'



const serverStart = () =>{
    try{
        app.listen(config.port,()=>console.log(`server running on port ${3000}`))
        dbConnection()
    }catch(error){
        throw new Error("something went wrong to server connection")
    }
}


serverStart();