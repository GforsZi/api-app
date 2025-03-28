const { getUsers, createUser } = require("../controllers/UserController.js");
const express = require("express");

const v1_api_router = express.Router();

v1_api_router.get("/users", getUsers);
v1_api_router.post("/users", createUser);

module.exports = v1_api_router;