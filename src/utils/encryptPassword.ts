import bcrypt from 'bcrypt'

function encryptPassword(password: string) {
  const SALT = 10

  const passwordEncrypted = bcrypt.hashSync(password, SALT)

  return passwordEncrypted
}

export default encryptPassword