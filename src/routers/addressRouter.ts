import { Router } from "express";

import validateToken from "../middlewares/validateToken";

import createAddress from "../controllers/addressController";

const addressRouter = Router()

addressRouter.post("/address", validateToken, createAddress)

export default addressRouter