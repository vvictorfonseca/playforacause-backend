import { Request, Response } from "express";
import purchaseService, { CreatePurchase } from "../services/purchasesService";

async function createPurchase(req: Request, res: Response) {
  const newPurchase: CreatePurchase[] = req.body

  await purchaseService.createPurchase(newPurchase)

  return res.sendStatus(201)
}

async function getPurchasesByUserId(req: Request, res: Response) {
  const userId = res.locals.user.id

  const purchases = await purchaseService.getPurchasesById(userId)

  return res.status(200).send(purchases)
}

export { createPurchase, getPurchasesByUserId }