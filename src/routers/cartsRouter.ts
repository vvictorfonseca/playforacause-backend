import { Router } from "express";

import { addToCart, getUserCart, decrementUnitFromUserCart, deleteProductInCart } from "../controllers/cartsController";
import validateToken from "../middlewares/validateToken";

const cartsRouter = Router()

cartsRouter.post("/cart", validateToken, addToCart)
cartsRouter.get("/cart", validateToken, getUserCart)
cartsRouter.put("/cart/:cartId", validateToken, decrementUnitFromUserCart)
cartsRouter.delete("/cart/:cartId", validateToken, deleteProductInCart)

export default cartsRouter