import { carts } from "@prisma/client";

import cartsRepository from "../repositories/cartsRepository";

export type CreateCartData = Omit<carts, "id">

async function addToCart(newCart: CreateCartData) {
  await cartsRepository.addToCart(newCart)
}

async function getUserCart(userId: number) {
  const cart = await cartsRepository.getUserCart(userId)

  cart.forEach((product) => {
    //product.products.price = product.products.price * product.products.units
  })
}