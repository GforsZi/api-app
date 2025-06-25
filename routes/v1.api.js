const express = require('express')
const { getUsers, createUser, updateUser } = require('../controllers/api/UserController.js')

const v1_api_router = express.Router()

v1_api_router.get('/users', getUsers)
v1_api_router.post('/users', createUser)
v1_api_router.put('/users/:id', updateUser)

module.exports = v1_api_router
