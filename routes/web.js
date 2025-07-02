const LandingController = require('../controllers/web/LandingController.js')
const HomeController = require('../controllers/web/HomeController.js')
const express = require('express')

const web_router = express.Router()

web_router.get('/', (req, res) => {
  LandingController.landing(req, res)
})

web_router.get('/home', (req, res) => {
  HomeController.home(req, res)
})

module.exports = web_router
