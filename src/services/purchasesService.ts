import { purchases } from "@prisma/client";

import addressRepository from "../repositories/adressRepository";
import purchaseRepository from "../repositories/purchaseRepository";
import productsService from "./productsService";

export type CreatePurchaseData = Omit<purchases, "id">

export interface CreatePurchase {
  id: number;
  userId: number;
  productId: number;
  units: number;
  products: {
    id: number;
    name: string
    price: number;
    description: string;
    image: string;
    size: string;
    units: number;
  }
}

async function createPurchase(newPurchase: CreatePurchase[]) {

  newPurchase.forEach(async (infos) => {
    
    const address = await addressRepository.getLastRegistered()
    
    await purchaseRepository.createPurchase({
      userId: address.userId,
      productId: infos.productId,
      units: infos.units,
      addressId: address.id
    })

    await productsService.decrementProductUnits(infos.productId, infos.units)
  })
}

async function getPurchasesById(userId: number) {
  const purchases = await purchaseRepository.getPurchasesByUserId(userId)

  return purchases
}

const purchaseService = {
  createPurchase,
  getPurchasesById
}

export default purchaseService