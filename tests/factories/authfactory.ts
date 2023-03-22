import app from '../../src/app';

import bcrypt from 'bcrypt'
import { faker } from '@faker-js/faker'
import supertest from 'supertest';

const agent = supertest(app)

function createUserSignUp(email: string = "fulano@gmail.com", passwordLenght: number = 6) {
  const password = faker.internet.password(passwordLenght);
  const firstName = faker.name.firstName();
  const surname = faker.name.lastName();
  return {
    email,
    password,
    firstName,
    surname
  }
}

async function createValidUser() {
  const data = createUserSignUp()
  const response = await agent.post("/user").send(data)

  expect(response.statusCode).toEqual(201)

  return data
}

const authFactory = {
  createUserSignUp,
  createValidUser
}

export default authFactory

