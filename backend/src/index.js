import express from 'express';
const app=express();
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors'
const Port=process.env.PORT;


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cookieParser());

app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}));
app.use('/api/auth',authRoutes)
app.use("/api/message",messageRoutes)


connectDB().then(() => {
  app.listen(Port, () => {
    console.log(`Server is running at http://localhost:${Port}`);
  });
});