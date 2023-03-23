import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema";
import { userSignUpSchema, userLoginSchema } from "../schemas/authSchema";

import { createUser, loginUser, getUsers } from "../controllers/authController";

const authRouter = Router()

authRouter.post("/user", validateSchema(userSignUpSchema), createUser)
authRouter.post("/user/login", validateSchema(userLoginSchema), loginUser)
authRouter.get("/", getUsers)

export default authRouter