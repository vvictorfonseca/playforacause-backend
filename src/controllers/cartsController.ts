import { Request, Response } from "express";
import cartsService, { CreateCartData, CreateUpdateCart } from "../services/cartsService";

async function addToCart(req: Request, res: Response) {
  const userId = res.locals.user.id

  interface IBody {
    productId: number;
    units: number
  }
  
  const body: IBody =  req.body

  const newCart: CreateCartData = {
    userId,
    productId: body.productId,
    units: body.units
  }

  await cartsService.addToCart(newCart)

  return res.sendStatus(201)
}

async function getUserCart(req: Request, res: Response) {
  const userId = res.locals.user.id

  const cart = await cartsService.getUserCart(userId)

  return res.status(200).send(cart)
}

async function decrementUnitFromUserCart(req: Request, res: Response) {
  const userId = res.locals.user.id
  const cartId = parseInt(req.params.cartId)

  const body: CreateUpdateCart = {
    id: cartId,
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