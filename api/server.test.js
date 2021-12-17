const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
afterAll(async () => {
  await db.destroy()
})

describe("Database enviroment", () => {
  it("is in the correct env", () => {
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
  it("responds with new user if inputs are valid", async () => {
    expect(201)
    expect(res.body).toHaveProperty("id", 1)
    expect(res.body).toHaveProperty("username", "Alfred9000")
    expect(res.body).toHaveProperty("password")
  })
  it('responds with { message: "username taken" } if the request body does not contain either a username or password key with a value', async () => {
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
  it('responds with { message: "username taken" } if the username in the request body already exists in the database', async () => {
    const responce = await request(server)
      .post('/api/auth/register')
      .send({
        username: "Alfred9000",
        password: "1234"
      })
    expect(409)
    expect(responce.body).toMatchObject({
      message: "username taken"
    })
  })
})

// describe("[POST] /api/auth/login", () => {

// })
