import { address } from "@prisma/client"

import addressRepository from "../repositories/adressRepository"

export type CreateAdressData = Omit<address, "id">
export type CreateAddresBody = Omit<address, "id" | "userId">

async function createAddress(newAddress: CreateAdressData) {
  
  await addressRepository.createAddress(newAddress)

  const address = await addressRepository.getLastRegistered()

  return address
}

const addressService = {
  createAddress
}

export default addressService