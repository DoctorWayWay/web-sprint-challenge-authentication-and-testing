const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

describe("Database enviroment", () => {
  it("is in the testing enviroment", () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})

describe("[POST] /api/auth/register", () => {
  let res
  beforeEach(async () => {
    res = await request(server)
      .post('/api/auth/register')
      .send({
        username: "Alfred9000",
        password: "abc123"
      })
  })
  it("responds with new user and status code 201 if inputs are valid", async () => {
    expect(201)
    expect(res.body).toHaveProperty("id", 2)
    expect(res.body).toHaveProperty("username", "Alfred9000")
    expect(res.body).toHaveProperty("password")
  })
  it('responds with { message: "username taken" } and status code 400 if the request body does not contain either a username or password key with a value', async () => {
    const responce = await request(server)
      .post('/api/auth/register')
      .send({
        username: "",
        password: "1234"
      })
    expect(400)
    expect(responce.body).toMatchObject({
      message: "username and password required"
    })
  })
  it('responds with { message: "username taken" } and status code 409 if the username in the request body already exists in the database', async () => {
    const responce = await request(server)
      .post("/api/auth/register")
      .send({
        username: "eli_the_lion",
        password: "1234"
      })
    expect(409)
    expect(responce.body).toMatchObject({
      message: "username taken"
    })
  })
})

describe("[POST] /api/auth/login", () => {
  it('responds with an object containing a "message" key with the value "welcome {nameOfUser}" and status code 200 if the request body username and password are valid', async () => {
    const responce = await request(server)
      .post("/api/auth/login")
      .send({
        username: "eli_the_lion",
        password: "abc123"
      })
    expect(200)
    expect(responce.body).toHaveProperty("message", "welcome eli_the_lion")
  })
  it('responds with { message: "invalid credentials" } and status code 401 if request body username and password are invalid', async () => {
    const responce = await request(server)
      .post("/api/auth/login")
      .send({
        username: "eli_the_lion",
        password: "badPassword"
      })
    expect(401)
    expect(responce.body).toHaveProperty("message", "invalid credentials")
  })
  it('responds with { message: "username and password required" } and status code 400 if either request body username or password are missing', async () => {
    const responce = await request(server)
      .post("/api/auth/login")
      .send({
        username: "",
        password: "abc123"
      })
    expect(400)
    expect(responce.body).toHaveProperty("message", "username and password required")
  })
})
