const path = require('path')

require('dotenv').config({
  path: path.join(process.cwd(), '.env')
})

module.exports = {
  node_env: process.env.NODE_ENV,
  server_port: process.env.PORT,
  database_url: process.env.DATABASE_URL
}
