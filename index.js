const express = require('express')
const v1_api_router = require('./routes/api.js')
const web_router = require('./routes/web.js')

const port = '3030'
const app = express()
app.set("view engine", "ejs");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', v1_api_router)

app.post('/user', function (request, response) {
  console.log(request.body)

  response.send('user Express.js!')
})

app.use('/', web_router)

app.listen(port, () => {
  console.log(`api run on localhost port ${port}, [ http://localhost:${port} ]`)
})
