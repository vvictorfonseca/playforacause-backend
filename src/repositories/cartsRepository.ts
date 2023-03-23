import prisma from "../config/database";
import { CreateCartData } from "../services/cartsService";

async function addToCart(newCart: CreateCartData) {
  await prisma.carts.create({
    data: newCart
  })
}

const cartRepository = {
  addToCart
}

export default cartRepository