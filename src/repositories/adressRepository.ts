import prisma from "../config/database";
import { CreateAdressData } from "../services/addressesService";

async function createAddress(newAddress: CreateAdressData) {
  const address = await prisma.address.create({ data: newAddress })

  return address
}

async function getLastRegistered() {
  const id = prisma.address.findFirst({
    orderBy: {
      id: 'desc'
    },
    take: 1
  })

  return id
}

const addressRepository = {
  createAddress,
  getLastRegistered
}

export default addressRepository