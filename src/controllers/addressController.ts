import { Request, Response } from "express";
import addressService, { CreateAdressData, CreateAddresBody } from "../services/addressesService";

async function createAddress(req: Request, res: Response) {
  const userId = res.locals.user.id
  const address: CreateAddresBody = req.body

  const body: CreateAdressData = {
    userId: userId,
    city: address.city,
    street:address.city,
    number: address.number,
    district: address.district,
    complement: address.complement,
    cep: address.cep
  }

  await addressService.createAddress(body)

  return res.sendStatus(201)
}

export default createAddress