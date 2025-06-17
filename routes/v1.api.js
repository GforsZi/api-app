const { getUsers, createUser, updateUser } = require("../controllers/UserController.js");
const express = require("express");

const v1_api_router = express.Router();

v1_api_router.get("/users", getUsers);
v1_api_router.post("/users", createUser);
v1_api_router.put("/users", updateUser);

module.exports = v1_api_router;