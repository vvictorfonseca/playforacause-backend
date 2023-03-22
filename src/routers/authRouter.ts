import { Router } from "express";

import { createUser, loginUser } from "../controllers/authController";

const authRouter = Router()

authRouter.post("/user", createUser)
authRouter.post("/user/login", loginUser)

export default authRouter