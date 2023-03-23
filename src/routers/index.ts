import { Router } from "express";

import authRouter from "./authRouter";
import productRouter from "./productsRouter";
import cartsRouter from "./cartsRouter";

const router = Router()

router.use(authRouter)
router.use(productRouter)
router.use(cartsRouter)

export default router