import express from 'express';
const app=express();
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js';
dotenv.config();

const Port=process.env.PORT;

app.use('/api/auth',authRoutes)
app.listen(Port,()=>{
    console.log(`Server is running at http://localhost:${Port}`)
    connectDB();
})