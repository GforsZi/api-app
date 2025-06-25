const indexcontroller = require('../controllers/web/indexcontroller.js')
const express = require('express')

const web_router = express.Router()


web_router.get("/", (req, res) => {
  indexcontroller.index(req, res);
});

module.exports = web_router
