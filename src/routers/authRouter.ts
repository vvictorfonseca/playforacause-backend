import { Router } from "express";

import { createUser, loginUser, getUsers } from "../controllers/authController";

const authRouter = Router()

authRouter.post("/user", createUser)
authRouter.post("/user/login", loginUser)
authRouter.get("/", getUsers)

export default authRouter