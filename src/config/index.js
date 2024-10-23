const path = require('path')

require('dotenv').config({
  path: path.join(process.cwd(), '.env')
})

module.exports = {
  node_env: process.env.NODE_ENV,
  server_port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt_access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwt_access_token_expiresin: process.env.JWT_ACCESS_TOKEN_EXPIRESIN,
  jwt_refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
  jwt_refresh_token_expiresin: process.env.JWT_REFRESH_TOKEN_EXPIRESIN,

}
