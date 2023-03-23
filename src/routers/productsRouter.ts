import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema";
import saveProduct from "../schemas/productSchema";

import { createProduct, getProducts, decrementProductUnits } from "../controllers/productsController";

const productRouter = Router()

productRouter.post("/product", validateSchema(saveProduct), createProduct)
productRouter.get("/products", getProducts)
productRouter.put("/product/decrement/:id", decrementProductUnits)

export default productRouter