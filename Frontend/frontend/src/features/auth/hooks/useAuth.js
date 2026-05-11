import { login, register, getMe } from "../services/auth.api.js"
import { setError, setLoading, setUser } from "../state/auth.slice.js"
import { useDispatch } from "react-redux"


export const useAuth = () => {
   const dispatch = useDispatch();
   const handleRegister = async ({ fullname, contact, email, password, isSeller = false }) => {
      try {
         dispatch(setLoading(true));
         const data = await register({ fullname, contact, email, password, isSeller });
         dispatch(setUser(data.user))
         return data.user
      } catch (err) {
         dispatch(setError(err.message || "Registeration Failed"))
      }
      finally {
         dispatch(setLoading(false))
      }
   }

   const handleLogin = async ({ email, contact, password }) => {
      try {
         dispatch(setLoading(true));
         const data = await login({ email, contact, password });
         dispatch(setUser(data.user))
         return data.user
      } catch (err) {
         dispatch(setError(err.message || "Login Failed"))
      }
      finally {
         dispatch(setLoading(false))
      }


   }

   const handleGetMe = async () => {
      try {
         dispatch(setLoading(true));
         const data = await getMe();
         dispatch(setUser(data.user));
         return data.user
      }
      catch (err) {
         dispatch(setError(err.message || "Failed to fetch user"))
      }
      finally{
         dispatch(setLoading(false))
      }
   }
   return { handleLogin, handleRegister, handleGetMe }


}