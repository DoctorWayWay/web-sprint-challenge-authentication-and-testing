const db = require("../../data/dbConfig")
const Users = require("../users/users-model")

async function register(credentials) {
  const newUserID = await db("users")
    .insert(credentials)
    .first()
  const newUser = await Users.findById(newUserID)
  return newUser
}

module.exports = {
  register,
}
