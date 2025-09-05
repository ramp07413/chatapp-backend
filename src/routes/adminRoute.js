import { Router } from "express";
import { banuser, deleteUser, getAllUsers, roleChange } from "../controller/adminController.js";
import { isAuthenticated, isAuthorized } from "../middleware/authMiddleware.js";

const router = Router()

router.get("/user",isAuthenticated,isAuthorized("admin"), getAllUsers)
router.patch("/ban/:id", isAuthenticated, isAuthorized("admin"), banuser)
router.delete("/delete/:id",isAuthenticated, isAuthorized("admin"),  deleteUser)
router.patch("/role/:id",isAuthenticated, isAuthorized("admin"), roleChange)

export {router as adminRouter}