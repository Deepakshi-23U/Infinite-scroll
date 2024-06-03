import express from "express";
import bcrypt from "bcryptjs"
import Users from "../models/users.js"
import { AppError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import validator from "validator";
dotenv.config();

const router = express.Router();

router.post('/register', async (req,res,next)=>{
    try
    {
        //if one field is missing
        const {username, password, email} = req.body;
       
        if(!username || !password || !email) return next(AppError(400,"Field missing"));

        const exists = await Users.findOne({email});

        //validation
        if(exists) return next(AppError(400,"Email already exists"));

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);

        //password not strong
        if(!validator.isStrongPassword(password)) return next(AppError(400,"Password is not strong enough"));

        const newuser = new Users({
        username: req.body.username,
        email: req.body.email,
        password:hash,
        fullname: req.body.fullname,
       })
  
       await newuser.save();
       res.status(200).json("user has been created!");
    }
    catch(e)
    {
       next(e);
    }
})

router.post('/login', async (req,res,next)=>{
    try
    {
        const username = req.body.username;
        const password = req.body.password;
       
        if(!username || !password) return next(AppError(400,"Field missing"));

        const user = await Users.findOne({username:req.body.username})
        if(!user) return next(AppError(404,"User not found"));

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)
        if(!isPasswordCorrect) return next(AppError(400,"Username or password incorrect"))
        
        //if password is correct, for each login a token will be given to the user to keep him authenticated
        
      const token = jwt.sign({username:user.username, id:user._id}, process.env.SECRET, { expiresIn: '1h' });

      res.cookie("access_token", token, {httpOnly:true, path:"/", maxAge: 3600000}).status(200)
      .json({username:user.username});

  } 
  catch (err) {
    next(err);
  }
    
})

export default router;