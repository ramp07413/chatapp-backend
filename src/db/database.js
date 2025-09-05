import mongoose from "mongoose"

export const connectDB = ()=>{
    mongoose.connect("mongodb+srv://rp074:jrOMh07F39cAFJc0@inootbook.an4mp.mongodb.net/?retryWrites=true&w=majority&appName=iNootbook", {
        dbName : "chatapp"
    })
    .then(()=>{
        console.log("database conneted successfully ! ")
    })
    .catch((err)=>{
        console.log("database connection failed...!")
    }) 
}