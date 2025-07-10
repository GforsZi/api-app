const express = require('express')
const {
  login,
  logout,
  checkUserSession,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  changeUserPassword,
  deleteUser,
} = require('../controllers/api/UserController.js')
const {
  schemaCreateUser,
  schemaUpdateUser,
  schemaChangePasswordUser,
} = require('../utils/apiValidation.js')
const validate = require('../controllers/middleware/validate.js')
const { loginAuth } = require('../controllers/middleware/auth.js')

const v1_api_router = express.Router()

v1_api_router.post('/user/login', login)
v1_api_router.post('/user/logout', loginAuth, logout)
v1_api_router.get('/user/login/check', checkUserSession)

v1_api_router.get('/user', loginAuth, getAllUsers)
v1_api_router.get('/user/:id', loginAuth, getUserById)
v1_api_router.post('/user/add', loginAuth, validate(schemaCreateUser), createUser)
v1_api_router.put('/user/:id/edit', loginAuth, validate(schemaUpdateUser), updateUser)
v1_api_router.put(
  '/user/:id/changePassword', loginAuth,
  validate(schemaChangePasswordUser),
  changeUserPassword,
)
v1_api_router.delete('/users/:id/delete', deleteUser)

module.exports = v1_api_router
