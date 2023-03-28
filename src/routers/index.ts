import { Router } from "express";

import authRouter from "./authRouter";
import productRouter from "./productsRouter";
import cartsRouter from "./cartsRouter";
import addressRouter from "./addressRouter";
import purchasesRouter from "./purchasesRouter";

const router = Router()

router.use(authRouter)
router.use(productRouter)
router.use(cartsRouter)
router.use(addressRouter)
router.use(purchasesRouter)

export default router