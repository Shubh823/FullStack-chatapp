import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {connectDB} from "./lib/db.js";
import cors from 'cors';
dotenv.config();
import path from 'path';
import {app , server} from './lib/socket.js';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
const port =process.env.PORT;
const __dirname = path.resolve();



app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({limit:'10mb' ,extended:true}));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
     credentials:true,
    }));


app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

if(process.env.NODE_ENV === 'production'){
   app.use(express.static(path.join(__dirname,'../frontend/dist')));

   app.get('*',(req,res)=>{
     res.sendFile(path.join(__dirname,'../frontend','dist','index.html'));
   });
       
}


server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    connectDB();
});