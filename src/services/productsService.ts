import { products } from "@prisma/client";

import productsRepository from "../repositories/productsRepository";

export type CreateProductData = Omit<products, "id">

async function createProduct(newProduct: CreateProductData) {
  await productsRepository.createProduct(newProduct)
}

async function getProducts() {
  const allProducts = await productsRepository.getProducts()

  const products = allProducts.filter((product) => product.units > 0)  

  allProducts.forEach((product) => {
    product.units == 0 ? productsRepository.deleteProductById(product.id) : null
  })
  
  return products
}

async function decrementProductUnits(id: number) {
  const product = await productsRepository.getProductById(id)

  if(product?.units == 0) {
    throw { type: "not_allowed", message: "This product already has 0 units" }
  }

  await productsRepository.decrementProductUnits(id)
}

const productsService = {
  createProduct,
  getProducts,
  decrementProductUnits
}

export default productsService