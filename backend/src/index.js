import express from 'express';

import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { server,app } from './lib/socket.js';

import path from 'path'

dotenv.config();

const Port=process.env.PORT;

const __dirname=path.resolve();


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cookieParser());

app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}));
app.use('/api/auth',authRoutes)
app.use("/api/messages",messageRoutes)

if(process.env.NODE_ENV=="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  });
}

connectDB().then(() => {
  server.listen(Port, () => {
    console.log(`Server is running at http://localhost:${Port}`);
  });
});