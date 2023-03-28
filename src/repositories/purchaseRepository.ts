import prisma from "../config/database";

import { CreatePurchaseData } from "../services/purchasesService";

async function createPurchase(newPurchase: CreatePurchaseData) {
  await prisma.purchases.create({data: newPurchase})
}

async function getPurchasesByUserId(userId: number) {
  const purchases = await prisma.purchases.findMany({
    where: {
      userId
    },
    select: {
      id: true,
      units: true,
      createdAt: true,

      products: {
        select: {
          image: true,
          name: true,
          price: true,
          size: true,
        }
      },

      address: {
        select: {
          city: true,
          street: true,
          number: true
        }
      }
    },
    orderBy: {
      id: 'desc'
    }
  })

  return purchases
}

const purchaseRepository = {
  createPurchase,
  getPurchasesByUserId
}

export default purchaseRepository