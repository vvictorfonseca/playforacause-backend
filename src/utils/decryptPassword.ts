import authRepository from '../repositories/authRepository'

import bcrypt from 'bcrypt'

async function decryptPassword(email: string, password: string) {
  const user =  await authRepository.getUserByEmail(email)
  
  if(user) {
    const isCorrectPassword = bcrypt.compareSync(password, user.password)

    if(!isCorrectPassword) {
      throw { type: "not_found", message: "Invalid password" }
    }
  }

  if(!user) {
    throw { type: "not_found", message: "This email is not registered" }
  }

  return user
}

export default decryptPassword