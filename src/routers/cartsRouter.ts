import { Router } from "express";

import { addToCart, getUserCart, decrementUnitFromUserCart, deleteProductInCart } from "../controllers/cartsController";

const cartsRouter = Router()

cartsRouter.post("/cart", addToCart)
cartsRouter.get("/cart/:userId", getUserCart)
cartsRouter.put("/cart/:userId", decrementUnitFromUserCart)
cartsRouter.delete("/cart/:cartId", deleteProductInCart)

export default cartsRouter