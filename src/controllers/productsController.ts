import { Request, Response } from "express";
import productsService, { CreateProductData } from "../services/productsService";

async function createProduct(req: Request, res: Response) {
  const newProduct: CreateProductData = req.body

  await productsService.createProduct(newProduct)

  return res.sendStatus(201)
}

async function getProducts(req: Request, res: Response) {
  const products = await productsService.getProducts()

  return res.status(200).send(products)
}

async function getProductById(req: Request, res: Response) {
  const productId = parseInt(req.params.productId)

  const product = await productsService.getProductById(productId)

  return res.status(200).send(product)
}

async function decrementProductUnits(req: Request, res: Response) {
  const id: number = parseInt(req.params.id)

  await productsService.decrementProductUnits(id)

  return res.sendStatus(201)
}

export { createProduct, getProducts, getProductById, decrementProductUnits }