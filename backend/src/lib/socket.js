import {Server } from 'socket.io'
import http from 'http'
import express from 'express'

const app=express()
const server=http.createServer(app);

const io=new Server (server,{
    cors:{
        origin:["http://localhost:5173"]
    }
})
//used to store online users
const userSocketMap={};

export function getReceiverSocketId(userId){
    return userSocketMap[userId];
}


io.on("connection",(socket)=>{
    console.log("A user connected",socket.id);

    const userId=socket.handshake.query.userId;

    if(userId){
        userSocketMap[userId]=socket.id;
    }

    //for online users
    io.emit("getOnlineUsers",Object.keys(userSocketMap)) ;//to send events to connected users

    socket.on("disconnect",()=>{
        console.log("A user disconnected",socket.id)
    })
});



export {io,app ,server};