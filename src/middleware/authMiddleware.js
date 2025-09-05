import jwt from 'jsonwebtoken'
import { user } from '../model/userModel.js';


export const  isAuthenticated = async(req, res, next)=>{
    try{
        let token;
        if(req.cookies && req.cookies.token){
            token = req.cookies.token
        }
        else if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
        
        if(!token){
            return res.status(401).json({success: false, message: "Access denied. No token provided."})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret")
        const data = await user.findById(decoded.id)
        if(!data){
            return res.status(401).json({success: false, message: "Invalid token. User not found."})
        }

        req.user = data;
        next()

    }
    catch(err){
        if(err.name === 'JsonWebTokenError'){
            return res.status(401).json({success: false, message: "Invalid token."})
        }
        if(err.name === 'TokenExpiredError'){
            return res.status(401).json({success: false, message: "Token expired."})
        }
        console.error(err)
        return res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const  isAuthorized = (...role)=>{
    return(req, res , next)=>{
        if(!role.includes(req.user.role)){
            return next(new Error(`user with this role ${req.user.role} not allowed to access this resource `))
        }
        next()
    }
}