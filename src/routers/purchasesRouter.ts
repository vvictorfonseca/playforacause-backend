import { Router } from "express";

import validateToken from "../middlewares/validateToken";
import { createPurchase, getPurchasesByUserId } from "../controllers/purchaseController";

const purchasesRouter = Router()

purchasesRouter.post("/purchase", createPurchase)
purchasesRouter.get("/purchase", validateToken, getPurchasesByUserId)


export default purchasesRouter