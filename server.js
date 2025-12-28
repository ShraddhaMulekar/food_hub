const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./db')
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cors())


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  connectDB()
})