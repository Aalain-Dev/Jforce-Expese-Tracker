import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";

const router = Router()


router.post("/login", loginUser)
router.post("/signup", registerUser)

export default router;