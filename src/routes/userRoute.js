import { Router } from "express";


// import dotenv from "dotenv";
import { forgetPassword, getStates, getUser, googleLogin, googleurl, resetPassword, updatePassword, updateProfile, userLogin, userLogout, userProfile, userRegister } from "../controller/authController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

// dotenv.config();


const router = Router()
// userRoute.js

// #swagger.path = '/api/v1/auth/register'
// #swagger.tags = ['Auth']
router.post("/register", userRegister)

// #swagger.path = '/api/v1/auth/login'
// #swagger.tags = ['Auth']
router.post("/login", userLogin)

// #swagger.path = '/api/v1/auth/google'
// #swagger.tags = ['Auth']
router.get("/google", googleurl)

// #swagger.path = '/api/v1/auth/updatePassword'
// #swagger.tags = ['Auth']
router.patch("/updatePassword", isAuthenticated, updatePassword)

// #swagger.path = '/api/v1/auth/google/callback'
// #swagger.tags = ['Auth']
router.get("/google/callback", googleLogin)

// #swagger.path = '/api/v1/auth/me'
// #swagger.tags = ['Auth']
router.get("/me", isAuthenticated, getUser)

// #swagger.path = '/api/v1/auth/logout'
// #swagger.tags = ['Auth']
router.post("/logout", userLogout)

// #swagger.path = '/api/v1/auth/forget'
// #swagger.tags = ['Auth']
router.post("/forget", forgetPassword)

// #swagger.path = '/api/v1/auth/profile'
// #swagger.tags = ['Auth']
router.get("/profile", isAuthenticated, userProfile)

// #swagger.path = '/api/v1/auth/update'
// #swagger.tags = ['Auth']
router.put("/update", isAuthenticated, updateProfile)

// #swagger.path = '/api/v1/auth/reset/{token}'
// #swagger.tags = ['Auth']
router.put("/reset/:token", resetPassword)

// #swagger.path = '/api/v1/auth/user-states'
// #swagger.tags = ['Auth']
router.get("/user-states", isAuthenticated, getStates
)

export {router as userRouter}