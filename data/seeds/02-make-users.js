const bcrypt = require('bcryptjs')
const { BCRYPT_ROUNDS } = require("../../api/secrets")

const users = [
  {
    username: "eli_the_lion",
    password: bcrypt.hashSync("abc123", BCRYPT_ROUNDS)
  }
]

exports.seed = async function (knex) {
  await knex("users").insert(users)
}
