import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import userModel from "../models/user.model.js";
import { json } from "express";

export const authenticateUser = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(404).json({ message: "token not found", success: false })
    }

    try {

        const decode = await jwt.verify(token, config.jwt_secert)
        if (!decode) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const user = await userModel.findOne({ _id: decode.id });
        if (!user) {
            return res.status(401), json({ message: "Unauthorized User" })
        }
        req.user = user
        
        next()

    } catch (err) {
        return res.status(500).json({ message: err.message, success: false })
    }
}

export const authenticateSeller = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(404).json({ message: "Token not Found", success: false })
    }
    try {
        const decode = await jwt.verify(token, config.jwt_secert);
        if (!decode) {
            return res.status(401).json({ message: "Unauthorized", success: false })
        }
        const user = await userModel.findOne({ _id: decode.id })
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (user.role !== "seller") {
            return res.status(409).json({ message: "Foribded" })
        }
        req.user = user
        next()

    } catch (err) {
        return res.status(500).json({ message: err.message, success: false })
    }
}