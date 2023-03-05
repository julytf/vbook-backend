require('dotenv').config({ path: './.env' })

const DB = require('../db')

DB.connect().then(() => DB.drop()).then(() => process.exit())
