import axios from "axios"

const ApiIntance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials:true
})

export const register = async ({fullname,contact,email,password,isSeller}) => {
    try{
        const response = await ApiIntance.post("/api/auth/register",{fullname,contact,email,password,isSeller});
        return response.data
    }catch(err){
        return err
    }
}

export const login = async ({email,contact,password}) => {
    try{
        const response = await ApiIntance.post("/api/auth/login",{email,contact,password});
        return response.data;
    }catch(err){
        return err
    }
}

export const getMe = async () =>{
    try{
      const response = await ApiIntance.get("/api/auth/get-me");
      return response.data;
    }catch(err){
        return err.message
    }
}
export const logout = async () => {
    try{
        const response = await ApiIntance.post("/api/auth/logout");
        return response.data
    }catch(err){
        throw new Error(err.response.data.message || "Logout failed. Please try again.")
    }
}

