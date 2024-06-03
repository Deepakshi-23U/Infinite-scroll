import express from 'express';
const app = express();
import mongoose from 'mongoose'
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

//axios works with cors
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true})) 

//importing routes
import userroutes from './routes/user.js'
import authroutes from './routes/auth.js'

//checking connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Mongoose connection open")
})
.catch(err=>{
    console.log("Oh no mongo error!", err)
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database Connected");
});

//checking if server is up
app.listen(process.env.PORT, ()=>{
    console.log("App is listening")
})

app.use('/u', userroutes);
app.use('/auth', authroutes);

//error handler
app.use((err,req,res,next)=>{
    const { status = 100, message = 'An error!'} = err;
    return res.status(status).json(message)
})
