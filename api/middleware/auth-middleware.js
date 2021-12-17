const Users = require("../users/users-model")

async function validateRegister(req, res, next) {
  const { username, password } = req.body
  if (!username || !password) {
    next({
      status: 400,
      message: "username and password required"
    })
  }
  const foundUser = await Users.findBy({ username: username })
  if (foundUser) {
    next({
      status: 409,
      message: "username taken"
    })
  }
  next()
}

module.exports = {
  validateRegister
}
