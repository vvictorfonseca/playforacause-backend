import prisma from "../config/database";
import { CreateUserData } from "../services/authService";

async function createUser(newUser: CreateUserData) {
  await prisma.users.create({data: newUser})
}

async function getUserByEmail(email: string) {
  const user = await prisma.users.findFirst({
    where: {
      email
    }
  })

  return user
}

async function getUsers() {
  const users = await prisma.users.findMany()

  return users
}

const authRepository = {
  createUser,
  getUserByEmail,
  getUsers
}

export default authRepository