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

describe("Authentication Router", () => {
  describe("[POST] /api/auth/register", () => {
    it("responds with new user if inputs are valid", async () => {
      const res = await request(server)
        .post('/api/auth/register')
        .send({
          username: "Alfred9000",
          password: "abc123"
        })
      expect(res.body).toHaveProperty("id", 1)
      expect(res.body).toHaveProperty("username", "Alfred9000")
      expect(res.body).toHaveProperty("password")
    })
  })
})
