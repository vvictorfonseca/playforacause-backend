import prisma from "../config/database";
import { CreateCartData } from "../services/cartsService";

async function addToCart(newCart: CreateCartData) {
  await prisma.carts.create({data: newCart})
}

async function getUserCart(userId: number) {
  const carts = prisma.carts.findMany({
    where: {
      userId
    },
    include: {
      products: {
        select: {
          name: true,
          price: true,
          description: true,
          image: true,
          size: true,
          units: true
        }
      }
    }
  })

  return carts
} 

const cartsRepository = {
  addToCart,
  getUserCart
}

export default cartsRepository