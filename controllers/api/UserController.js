const { getAllUsers, createUser, updateUser, deleteUser } = require('../../models/UserModel.js')
const apiResponse = require('../../utils/apiRespone.js')

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await getAllUsers()
    res.status(200).json(apiResponse(true, 'get all users data', users))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}

exports.createUser = async (req, res) => {
  const { email, name, job } = req.body
  try {
    const users = await createUser({ email, name, job })
    res.status(201).json(apiResponse(true, 'create users data', users))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id
    const { name, email, job } = req.body
    const users = await updateUser({id, name, email, job })
    res.status(201).json(apiResponse(true, 'update users data', users))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id
    const users = await deleteUser({id})
    res.status(201).json(apiResponse(true, 'delete users data', users))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}
