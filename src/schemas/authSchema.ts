import Joi from "joi";
import { CreateUserData, CreateUserLogin } from "../services/authService";

const userSignUpSchema = Joi.object<CreateUserData>({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  firstName: Joi.string().required(),
  surname: Joi.string().required()
})

const userLoginSchema = Joi.object<CreateUserLogin>({
  email: Joi.string().required(),
  password: Joi.string().min(4).required(),
})

export { userSignUpSchema, userLoginSchema }