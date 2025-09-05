import { getReceiverSoketId, io } from "../lib/socket.js"
import { message } from "../model/messageModel.js"
import { user } from "../model/userModel.js"
import { ErrorHandler } from "../utils/Errorhandler.js"

export const getUserForSideBar = async (req, res, next)=>{
try {
    const userId = req.user._id
    const filteredUsers = await user.find({_id : {$ne : userId}})

    res.status(200).json({filteredUsers})
} catch (err) {
    console.error("error : ", err.message)
}
}


export const getMessages = async (req, res, next)=>{
try {
    const {id : userTochatId} = req.params
    const senderId = req.user._id

    const messages = await message.find({
        $or : [
            {
                senderId : senderId,
                reciverId : userTochatId
            },
            {
                senderId : userTochatId,
                reciverId : senderId
            }
        ]
    })

    res.status(200).json({
        messages
    })
} catch (err) {
    console.error("error : ", err.message)
}
}



export const sendMessage = async (req, res, next)=>{
try {
    const { text } = req.body
    const {id : reciverId} = req.params
    const senderId = req.user._id

    if(!senderId || !reciverId){
        return next(new ErrorHandler("Sender or receiver ID missing", 400))
    }

    const newMessage = new message({
        senderId,
        reciverId,
        text
    })

    await newMessage.save()

    const receiverSocketId = getReceiverSoketId(reciverId)
    if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage", newMessage)
    }

    res.status(200).json({
        messages : newMessage
    })

} catch (err) {
    console.error("error : ", err.message)
    return next(new ErrorHandler("error in sending message", 500))
}
}