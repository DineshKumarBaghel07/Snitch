
export const errorHandler = (error)=>{
    if(error.response){
        throw new Error(error.response.data.message)
    }
    if(error.request){
        throw new Error("No response from server. Please try again later.")
    }
    if(error.message){
        throw new Error(error.message)
    }
}