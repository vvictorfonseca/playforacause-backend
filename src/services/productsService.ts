import { products } from "@prisma/client";

import productsRepository from "../repositories/productsRepository";

export type CreateProductData = Omit<products, "id">

async function createProduct(newProduct: CreateProductData) {
  await productsRepository.createProduct(newProduct)
}

async function getProducts() {
  const allProducts = await productsRepository.getProducts()
  
  return allProducts
}

async function getProductById(productId: number) {
  const product = await productsRepository.getProductById(productId)

  return product
}

async function decrementProductUnits(id: number, units: number) {
  await productsRepository.decrementProductUnits(id, units)
}

const productsService = {
  createProduct,
  getProducts,
  decrementProductUnits,
  getProductById
}

export default productsService