const Users = require("../users/users-model")

async function validateRegister(req, res, next) {
  const { username, password } = req.body
  if (!username || !password) {
    next({
      message: "username and password required"
    })
  }
  const foundUser = await Users.findBy({ username: username })
  if (foundUser) {
    next({
      message: "username taken"
    })
  }
  next()
}

module.exports = {
  validateRegister
}
