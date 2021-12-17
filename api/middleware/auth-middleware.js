const Users = require("../users/users-model")
const bcrypt = require('bcryptjs')

async function validateRegister(req, res, next) {
  const { username, password } = req.body
  if (!username || !password) {
    return next({
      status: 400,
      message: "username and password required"
    })
  }
  const foundUser = await Users.findBy({ username: username })
  if (foundUser) {
    return next({
      status: 409,
      message: "username taken"
    })
  }
  next()
}

const validateLogin = async (req, res, next) => {
  const { username, password } = req.body
  if (!username || !password) {
    return next({
      status: 400,
      message: "username and password required"
    })
  }
  const existingUser = await Users.findBy({ username })
  if (!existingUser || bcrypt.compareSync(password, existingUser.password) === false) {
    return next({
      status: 401,
      message: "invalid credentials"
    })
  }
  req.user = existingUser
  next()
}
module.exports = {
  validateRegister,
  validateLogin
}
