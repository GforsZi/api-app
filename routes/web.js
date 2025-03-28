const { about } = require("../controllers/AboutController.js")
const express = require("express")

const web_router = express.Router();

web_router.get("/", about)

module.exports = web_router;
