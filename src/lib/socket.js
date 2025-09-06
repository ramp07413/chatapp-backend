import { Server } from 'socket.io'
import http from 'http'
import express from 'express'



const app = express()

const server = http.createServer(app);

const io = new Server(server,{
    cors : {
        origin : ["https://teler.netlify.app"]
    }
}) 
//used to store online users

export const getReceiverSoketId = (userId)=>{
    return usersoketmap[userId];
}

const usersoketmap = {};

io.on("connection", (socket)=>{
    console.log("user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if(userId) usersoketmap[userId] = socket.id

    console.log("user id ", userId)
    //io.emit() is used to send event all the connected clients
    io.emit("getOnlineUsers", Object.keys(usersoketmap));
    socket.on("disconnect", ()=>{
        console.log("a user disconneted", socket.id);
        delete usersoketmap[userId];
        io.emit("getOnlineUsers", Object.keys(usersoketmap))
    })
})

export {io, app , server}
