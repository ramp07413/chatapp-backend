import express from 'express'
import { userRouter } from './routes/userRoute.js'
import { connectDB } from './db/database.js'
import { errorMiddleware } from './middleware/errorMiddleware.js'
import cors from 'cors'
import multer from "multer";
import { messageRouter } from './routes/messageRoute.js'
import { app, server } from './lib/socket.js'

const upload = multer();






app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}))

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(upload.none())

app.get("/",(req, res, next)=>{
    res.send("hello world !")
})
app.use("/api/v1/auth", userRouter)
app.use("/api/v1/message", messageRouter)

app.use(errorMiddleware)


connectDB()
  
server.listen(5001, ()=>{
    console.log("server is running with part 5001")
})

