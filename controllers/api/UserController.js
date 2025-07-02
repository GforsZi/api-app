const bcrypt = require('bcrypt');
const {
  getAllUsers,
  getUsers,
  getPasswordUser,
  createUser,
  updateUser,
  changeUserPassword,
  deleteUser,
} = require('../../models/UserModel.js')
const apiResponse = require('../../utils/apiRespone.js')

exports.getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers()
    res.status(200).json(apiResponse(true, 'get all users data', users))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}

exports.getUsers = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const user = await getUsers({id})
    res.status(200).json(apiResponse(true, 'get user data by id', user))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}

exports.createUser = async (req, res) => {
  const { email, name, password} = req.body
  const SALT_ROUNDS = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const users = await createUser({email, name, password: hashedPassword})
    res.status(201).json(apiResponse(true, 'create users data', users))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}

exports.updateUser = async (req, res) => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body

  try {
    const users = await updateUser({ id, name, email })
    res.status(201).json(apiResponse(true, 'update user data', users))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}

exports.changeUserPassword = async (req, res) => {
  const id = parseInt(req.params.id)
  const { old_password, new_password} = req.body
  const SALT_ROUNDS = 10;

  const userPassword = await getPasswordUser({id})
  const match = await bcrypt.compare(old_password, userPassword.password);
  
  if (!match) return res.status(500).json(apiResponse(false, "invalid credentials", null, 500))
  
  try {
    const hashedPassword = await bcrypt.hash(new_password, SALT_ROUNDS);
    const users = await changeUserPassword({id, password: hashedPassword})
    res.status(201).json(apiResponse(true, 'update user password data', users))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const users = await deleteUser({ id })
    res.status(201).json(apiResponse(true, 'delete users data', users))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}
