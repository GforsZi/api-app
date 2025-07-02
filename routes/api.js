const express = require('express')
const {
  getAllUsers,
  getUsers,
  createUser,
  updateUser,
  changeUserPassword,
  deleteUser,
} = require('../controllers/api/UserController.js')
const {schemaCreateUser, schemaUpdateUser, schemaChangePasswordUserd} = require('../utils/apiValidation.js')
const validate = require('../controllers/middleware/validate.js');

const v1_api_router = express.Router()

v1_api_router.get('/users', getAllUsers)
v1_api_router.get('/users/:id', getUsers)
v1_api_router.post('/users/add', validate(schemaCreateUser), createUser)
v1_api_router.put('/users/:id/edit', validate(schemaUpdateUser), updateUser)
v1_api_router.put('/users/:id/changePassword', validate(schemaChangePasswordUserd), changeUserPassword)
v1_api_router.delete('/users/:id/delete', deleteUser)

module.exports = v1_api_router
