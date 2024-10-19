import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
// import conversationRoutes from './routes/conversationRoutes.js'
import connectDB from './db/connectDB.js'
import cookieParser from 'cookie-parser'
import { app,server } from './socket/socket.js'

const PORT=process.env.PORT || 5000;
const __dirname=path.resolve();

dotenv.config()

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist')))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})


server.listen(PORT,()=>{
    connectDB();
    console.log("Server Running on port "+PORT);
})