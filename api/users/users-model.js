const db = require("../../data/dbConfig")

async function findById(id) {
  const user = await db("users")
    .where({ id })
    .first()
  return user
}

module.exports = {
  findById,
}
