const db = require("../../data/dbConfig")
const Users = require("../users/users-model")

async function register(credentials) {
  const [newUserID] = await db("users")
    .insert(credentials)
  const newUser = await Users.findBy({ id: newUserID })
  return newUser
}

// async function login(credentials) {
//   return
// }

module.exports = {
  register,
  // login,
}
