import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema";
import saveProduct from "../schemas/productSchema";

import { createProduct, getProducts, decrementProductUnits, getProductById } from "../controllers/productsController";

const productRouter = Router()

productRouter.post("/product", createProduct)
productRouter.get("/products", getProducts)
productRouter.get("/product/:productId", getProductById)
productRouter.put("/product/decrement/:id", decrementProductUnits)

export default productRouter