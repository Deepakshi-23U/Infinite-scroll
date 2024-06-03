import express from "express";
import Users from "../models/users.js"
const router = express.Router();
import { verifyToken } from "../utils/verifytoken.js";

router.get("/verify", verifyToken, (req,res)=>{
    console.log("backend", req.user);
    res.status(200).json(req.user.username);
})

router.get("/logout", verifyToken, (req,res)=>{
    return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out"})
})

export default router;