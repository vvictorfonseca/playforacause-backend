import { Request, Response } from "express";
import authService, { CreateUserData, CreateUserLogin } from "../services/authService";

async function createUser(req: Request, res: Response) {
  const newUser: CreateUserData = req.body

  await authService.createUser(newUser)

  return res.sendStatus(201) 
}

async function loginUser(req: Request, res: Response) {
  const newLogin: CreateUserLogin = req.body

  const userData = await authService.loginUser(newLogin)

  return res.status(200).send(userData)
}

async function getUsers(req: Request, res: Response) {
  console.log("teste feature")
  const users = await authService.getUsers()

  return res.status(200).send(users)
}

export { createUser, loginUser, getUsers }