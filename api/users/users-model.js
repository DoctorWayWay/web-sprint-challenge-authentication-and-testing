const db = require("../../data/dbConfig")

async function findBy(filter) {
  const [foundUser] = await db("users")
    .where(filter)
  return foundUser
}

module.exports = {
  findBy,
}
