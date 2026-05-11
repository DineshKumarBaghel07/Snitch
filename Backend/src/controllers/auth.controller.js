import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { config } from "../config/config.js";

const sendResponse = async(user,res,message) =>{

    //  create the payload for creating token
    const payload = {
        id:user._id
    }

    //  here we create token with help of jwt secert
    const token = await jwt.sign(
        payload,
        config.jwt_secert,{
        expiresIn:"7d"
    })
    //  here set token in cookie
    res.cookie("token",token,{
        maxAge:7*24*60*60*1000
    })

    res.status(200).json({
        message,
        success:true,
        user:{
            id:user._id,
            fullname:user.fullname,
            contact:user.contact,
            role:user.role
        }
    })
  

}

export const handleRegister = async(req,res) => {
   const {contact,fullname,email,isSeller,password} = req.body
  
   try{
    const isUser = await userModel.findOne({
    $or:[
        {email},
        {contact}
    ]
    })
    if(isUser){
        return res.status(409).json({
            message:"User already exist",
            success:false,
        })
    }
  
    const user = await userModel.create({
        fullname,
        contact,
        email,
        password,
        role:isSeller ? "seller" : "buyer",
        
    })

     sendResponse(user,res,"user successfully created")
   }catch(error){
    console.log(error)
    res.status(500).json({message:"somthing went wrong",success:false})
   }
}



export const handleLogin = async(req,res)=>{
    const {email,contact,password} = req.body;

   try{
     const user = await userModel.findOne({
        $or:[
            {email},
            {contact}
        ]
    })
    // console.log(`check user :${user}`)
    if(!user){
        return res.status(404).json({message:"user not found",success:false})
    }
    // console.log(`check before is Match ${password}`);
    const isMatch = await user.comparePassword(password)
     console.log(`check password:${isMatch}`);
    if(!isMatch){
        return res.status(401).json({message:"Wrong Password",success:false})
    }
    sendResponse(user,res,"your are logged in successfully")
   }catch(error){
    return res.status(500).json({message:"somethig went wrong",success:false})
   }
}

export const handleGoogleCallback = async (req,res)=>{
    const{id,displayName,emails} = req.user
    try{
        
        let user = await userModel.findOne({email:emails[0].value})
      
        if(!user){
            user = await userModel.create({
                fullname:displayName,
                email:emails[0].value,
                googleId:id
            })
        }
        const token = await jwt.sign({id:user._id,email:user.email},config.jwt_secert,{expiresIn:"7d"})

        res.cookie("token",token,{maxAge:7*24*60*60*1000})
        return res.redirect(config.NODE_ENV === "development" ? "http://localhost:5173/" :"/")
           
    }catch(error){
        return res.status(500).json({message:"Something went wrong",success:false})
    }
}




export const handlegetMe = async(req,res) => {
   const user = req.user;
   if(!user){
    return res.status(404).json({message:"unauthorized",success:false})
   }

   return res.status(200).json({message:"user fetch successfully",success:true,user:{
   fullname:user.fullname,
   contact:user.contact,
   email:user.email,
   role:user.role
   }})

}