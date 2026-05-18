import cookieParser from 'cookie-parser';
import express from 'express'
import authRouter from './routes/auth.route.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from './config/config.js';
import productRouter from './routes/product.route.js';
import morgan from 'morgan';
import cartRouter from './routes/cart.route.js'
import cors from "cors"
export const app = express();



app.use(cors({
    origin:config.BASE_URL || "http://localhost:5173",
    credentials:true,
}))
app.use(morgan("dev"))
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 app.use(cookieParser())

app.use(passport.initialize());
passport.use(new GoogleStrategy({
    clientID:config.GOOGLE_CLIENT_ID,
    clientSecret:config.GOOGLE_SECERT,
    callbackURL:"/api/auth/google/callback"
},(accessToken,refreshToken,profiel,done)=>{
   return done(null,profiel)
}))

//  @ prefix route for Auth
app.use('/api/auth',authRouter)
app.use("/api/products",productRouter)
app.use("/api/cart",cartRouter)
