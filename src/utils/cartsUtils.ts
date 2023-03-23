import productsRepository from "../repositories/productsRepository"
import cartsRepository from "../repositories/cartsRepository"
import { CreateCartData } from "../services/cartsService"

async function checkProductStock(productId: number, units: number) {
  const product = await productsRepository.getProductById(productId)

  if (product.units < units) {
    throw { type: "not_allowed", message: `Sorry, we have just ${product.units} of this product on our stock` }
  }
}

async function checkIfProductIsAlreadyOnCart(newCart: CreateCartData) {
  const productInCart = await cartsRepository.getCartByProductId(newCart.productId, newCart.userId)
  const product = await productsRepository.getProductById(newCart.productId)

  if (productInCart) {
    if (productInCart.units + newCart.units > product.units) {

      throw { type: "not_allowed", message: `Sorry, we no longer have these units in stock.` }

    } else {

      cartsRepository.incrementUnitsIfProductIsAlreadyOnUserCart(productInCart.id, newCart.units, newCart.userId)
      return false
    }
  }

  return true
}

const cartUtils = {
  checkProductStock,
  checkIfProductIsAlreadyOnCart
}

export default cartUtils