import {Router} from "express";
import passport from "passport";
import { validatorResgisterUser,validatorLogin } from "../validator/auth.validator.js";
import { handleRegister, handleLogin, handleGoogleCallback,handlegetMe,handleLogout} from "../controllers/auth.controller.js";
import { authenticateUser } from "../middelware/auth.middelware.js";
import {config} from "../config/config.js"
const authRouter = Router();

authRouter.post("/register",validatorResgisterUser,handleRegister);
authRouter.post("/login",validatorLogin,handleLogin)
authRouter.post("/logout",authenticateUser, handleLogout)
authRouter.get("/google",passport.authenticate("google",{scope:["profile","email"]}))
authRouter.get("/google/callback",passport.authenticate("google",{session:false,failureRedirect: config.NODE_ENV === "development" ? "http://localhost:5173/login" :"/login"}),handleGoogleCallback)
authRouter.get("/get-me",authenticateUser,handlegetMe)

export default authRouter;