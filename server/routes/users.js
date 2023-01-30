import express from "express";
import {userLogin, userRegister} from "../controllers/usersController.js"

const router = express.Router()

router.post("/login", userLogin)
router.post("/register", userRegister)

export default router