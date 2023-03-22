import { Router } from "express";

import { createProduct, getProducts, decrementProductUnits } from "../controllers/productsController";

const productRouter = Router()

productRouter.post("/product", createProduct)
productRouter.get("/products", getProducts)
productRouter.put("/product/decrement/:id", decrementProductUnits)

export default productRouter