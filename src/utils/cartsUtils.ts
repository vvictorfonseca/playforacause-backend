import productsRepository from "../repositories/productsRepository"
import cartsRepository from "../repositories/cartsRepository"
import { CreateCartData } from "../services/cartsService"

async function checkProductStock(productId: number, units: number) {
  const product = await productsRepository.getProductById(productId)

  if (product.units < units) {
    throw { type: "not_allowed", message: `Desculpa, temos apenas ${product.units} unidades deste produto no estoque` }
  }
}

async function checkIfProductIsAlreadyOnCart(newCart: CreateCartData) {
  const productInCart = await cartsRepository.getCartByProductId(newCart.productId, newCart.userId)
  const product = await productsRepository.getProductById(newCart.productId)

  if (productInCart) {
    if (productInCart.units + newCart.units > product.units) {

      throw { type: "not_allowed", message: `Todas as unidades em nosso estoque já estão no seu carrinho` }

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