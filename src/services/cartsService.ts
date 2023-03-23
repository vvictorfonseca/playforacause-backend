import { carts } from "@prisma/client";

import cartsRepository from "../repositories/cartsRepository";

import cartUtils from "../utils/cartsUtils";

export type CreateCartData = Omit<carts, "id">
export type CreateUpdateCart = Omit<carts, "units" | "productId">

async function addToCart(newCart: CreateCartData) {
  await cartUtils.checkProductStock(newCart.productId, newCart.units)

  const addNewCart = await cartUtils.checkIfProductIsAlreadyOnCart(newCart)

  addNewCart ? await cartsRepository.addToCart(newCart) : null
}

async function decrementUnitFromUserCart(updateCart: CreateUpdateCart) {
  const cart = await cartsRepository.getCartById(updateCart.id)

  cart.units == 1 ?
    await cartsRepository.deleteProductFromCart(updateCart.id)
    :
    await cartsRepository.decrementProductUnitFromUserCart(updateCart)
}

async function getUserCart(userId: number) {
  const cart = await cartsRepository.getUserCart(userId)

  cart.forEach((product) => {
    product.products.price = product.products.price * product.units
  })

  return cart
}

async function deleteProductInCart(cartId: number) {
  await cartsRepository.getCartById(cartId)
}

const cartsService = {
  addToCart,
  getUserCart,
  decrementUnitFromUserCart,
  deleteProductInCart
}

export default cartsService