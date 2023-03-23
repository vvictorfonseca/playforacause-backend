import { Request, Response } from "express";
import cartsService, { CreateCartData, CreateUpdateCart } from "../services/cartsService";

async function addToCart(req: Request, res: Response) {
  const newCart: CreateCartData =  req.body

  await cartsService.addToCart(newCart)

  return res.sendStatus(201)
}

async function getUserCart(req: Request, res: Response) {
  const userId = parseInt(req.params.userId)

  const cart = await cartsService.getUserCart(userId)

  return res.status(200).send(cart)
}

async function decrementUnitFromUserCart(req: Request, res: Response) {
  const userId = parseInt(req.params.userId)
  const cartId = req.body

  const body: CreateUpdateCart = {
    id: cartId.cartId,
    userId
  }

  await cartsService.decrementUnitFromUserCart(body)

  return res.sendStatus(200)
}

async function deleteProductInCart(req: Request, res: Response) {
  const cartId: number = parseInt(req.params.cartId)

  await cartsService.deleteProductInCart(cartId)

  return res.status(200).send({message: "Produto apagado do seu carrinho com sucesso!"})
}

export { addToCart, getUserCart, decrementUnitFromUserCart, deleteProductInCart }