import { users } from "@prisma/client"

import authRepository from "../repositories/authRepository"

import validateUserExistByEmail from "../utils/validateUserExist"
import encryptPassword from "../utils/encryptPassword"
import decryptPassword from "../utils/decryptPassword"

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({path: ".env"})

export type CreateUserData = Omit<users, "id">
export type CreateUserLogin = Omit<users, "id" | "firstName" | "surname">

async function createUser(newUser: CreateUserData) {
  await validateUserExistByEmail(newUser.email)

  const passwordEncrypted = encryptPassword(newUser.password)
  newUser.password = passwordEncrypted

  return await authRepository.createUser(newUser)
}

async function loginUser(newLogin: CreateUserLogin) {
  const user = await decryptPassword(newLogin.email, newLogin.password)

  const expiresAt = { expiresIn: 60 * 60 * 24 };
  const key = process.env.JWT_SECRET_KEY!
  const token = jwt.sign(
    {id: user.id, email: user.email},
    key,
    expiresAt
  )

  const data = {
    id: user.id,
    firstName: user.firstName,
    token: token
  }

  return data
}

async function getUsers() {
  const user = await authRepository.getUsers()

  return user
}

const authService = {
  createUser,
  loginUser,
  getUsers
}

export default authService