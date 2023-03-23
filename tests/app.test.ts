import app from "../src/app";
import supertest from "supertest";
import prisma from "../src/config/database";

import authFactory from "./factories/authfactory";

import { faker } from '@faker-js/faker'

beforeEach(async () => {
  await prisma.$executeRaw`DELETE from users WHERE email = 'fulano@gmail.com'`
})

const agent = supertest(app)

describe("User signUp tests", () => {

  it("return 201 for valid input", async () => {
    
    await authFactory.createValidUser()

  })

  it("return 401 for email already Registered", async () => {
    const data = await authFactory.createValidUser()

    const response = await agent.post("/user").send(data)
    expect(response.statusCode).toEqual(401)
  })

  it("return 422 for password with less than 4 digts", async () => {
    const data = authFactory.createUserSignUp()

    const response = await agent.post("/user").send({
      email: data.email,
      password: faker.internet.password(3),
      firstName: data.firstName,
      surname: data.surname
    })

    expect(response.statusCode).toEqual(422)
  })

  it("return 422 for empty required input", async () => {
    const data = authFactory.createUserSignUp()
    delete data.firstName

    const response = await agent.post("/user").send(data)
    expect(response.statusCode).toEqual(422)
  })  
})

describe("User login tests", () => {

  it("return token for valid input", async () => {
    const data = await authFactory.createValidUser()

    const response = await agent.post("/user/login").send({
      email: data.email, 
      password: data.password
    })

    const token = response.body.token
    expect(token).not.toBeNull
  })

  it("return 404 for wrong password", async () => {
    const data = await authFactory.createValidUser()

    const response = await agent.post("/user/login").send({
      email: data.email, 
      password: faker.internet.password(6)
    })

    expect(response.statusCode).toEqual(404)
  })

  it("return 404 for wrong email", async () => {
    const data = await authFactory.createValidUser()

    const response = await agent.post("/user/login").send({
      email: faker.internet.email(), 
      password: data.password
    })

    expect(response.statusCode).toEqual(404)
  })

  it("return 422 for empty required input", async () => {
    const data = await authFactory.createValidUser()

    const response = await agent.post("/user/login").send({
      email: data.email, 
      password: ""
    })

    expect(response.statusCode).toEqual(422)
  }) 
})

afterAll(async () => {
  prisma.$disconnect
});
