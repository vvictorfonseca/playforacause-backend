import authRepository from "../repositories/authRepository"

async function validateUserExistByEmail(email: string) {
  const user = await authRepository.getUserByEmail(email)

  if(!user) {
    throw {type: "not_allowed", message: "This email is already registered!"}
  }

}

export default validateUserExistByEmail