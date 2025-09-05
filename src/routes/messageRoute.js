import { Router  } from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { getMessages, getUserForSideBar, sendMessage } from "../controller/messageController.js";

const router = Router()


router.get("/users", isAuthenticated, getUserForSideBar)
router.get("/:id", isAuthenticated, getMessages)
router.post("/send/:id", isAuthenticated, sendMessage )


export {router as messageRouter}