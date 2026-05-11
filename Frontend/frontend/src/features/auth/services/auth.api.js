import axios from "axios"

const ApiIntance = axios.create({
    baseURL:"/api",
    withCredentials:true
})

export const register = async ({fullname,contact,email,password,isSeller}) => {
    try{
        const response = await ApiIntance.post("/auth/register",{fullname,contact,email,password,isSeller});
        return response.data
    }catch(err){
        return err
    }
}

export const login = async ({email,contact,password}) => {
    try{
        const response = await ApiIntance.post("/auth/login",{email,contact,password});
        return response.data;
    }catch(err){
        return err
    }
}

export const getMe = async () =>{
    try{
      const response = await ApiIntance.get("/auth/get-me");
      return response.data;
    }catch(err){
        return err.message
    }

}