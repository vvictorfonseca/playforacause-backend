import prisma from "../config/database";
import { CreateProductData } from "../services/productsService";

async function createProduct(newProduct: CreateProductData) {
  await prisma.products.create({data: newProduct})
}

async function getProducts() {
  const products = prisma.products.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
      description: true,
      size: true,
      club: true,
      units: true
    }
  })

  return products
}

async function deleteProductById(id: number) {
  await prisma.products.delete({
    where: {
      id
    }
  })
}

async function decrementProductUnits(id: number) {
  await prisma.products.updateMany({
    where: {
      id
    },
    data: {
      units: {
        decrement: 1
      }
    }
  })
}

async function getProductById(id: number) {
  const product = await prisma.products.findFirst({
    where: {
      id
    }
  })

  return product
}

const productsRepository = {
  createProduct,
  getProducts,
  deleteProductById,
  decrementProductUnits,
  getProductById
}

export default productsRepository