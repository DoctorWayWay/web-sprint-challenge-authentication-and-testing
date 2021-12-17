module.exports = {
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS) || 8,
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT) || 3300,
  JWT_SECRET: process.env.JWT_SECRET || 'what a secretive secret',
}
