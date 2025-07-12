const express = require('express')
const {
  login,
  register,
  logout,
  checkUserSession,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  changeUserPassword,
  deleteUser,
} = require('../controllers/api/UserController.js')
const {getAllPost, getPostById, createPost, updatePost, deletePost} = require('../controllers/api/PostController.js')
const {
  schemaRegister,
  schemaCreateUser,
  schemaUpdateUser,
  schemaChangePasswordUser,
} = require('../utils/apiValidation.js')
const validate = require('../controllers/middleware/validate.js')
const { loginAuth } = require('../controllers/middleware/auth.js')
const upload = require('../controllers/middleware/upload.js')

const v1_api_router = express.Router()

v1_api_router.post('/user/login', login)
v1_api_router.post('/user/register', validate(schemaRegister), register)
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

v1_api_router.get('/post', loginAuth, getAllPost)
v1_api_router.get('/post/:id', loginAuth, getPostById)
v1_api_router.post('/post/add', loginAuth, upload.single('file'), createPost)
v1_api_router.put('/post/:id/edit', loginAuth,upload.single('file'), updatePost)
v1_api_router.delete('/post/:id/delete', loginAuth, deletePost)

module.exports = v1_api_router
