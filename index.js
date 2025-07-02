require('dotenv').config()
const express = require('express')
const v1_api_router = require('./routes/api.js')
const web_router = require('./routes/web.js')

const port = process.env.PORT
const url = process.env.URL
const app = express()
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/v1', v1_api_router)
app.use('/', web_router)

app.listen(port, () => {
  console.log(`api run on localhost port ${port}, [ ${url}:${port} ]`)
})
