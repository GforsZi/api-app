const bcrypt = require('bcrypt');
const {
  getAllUsers,
  getUserById,
  getUserByEmail,
  getPasswordUser,
  createUser,
  registerAccount,
  updateUser,
  changeUserPassword,
  deleteUser,
} = require('../../models/UserModel.js')
const apiResponse = require('../../utils/apiRespone.js')

exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    let user = await getUserByEmail({email})
    if (!user) return res.status(401).json(apiResponse(false, 'incorect email or password', null, 401))

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(401).json(apiResponse(false, 'incorect email or password', null, 401))

    req.session.userId = user.id
    res.status(200).json(apiResponse(true, 'login successfully', null))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}

exports.register = async (req, res) => {
  const { email, name, password} = req.body
  const SALT_ROUNDS = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const users = await registerAccount({email, name, password: hashedPassword})
    res.status(201).json(apiResponse(true, 'register successfully', users))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}

exports.logout = async (req, res) => {
  const {password} = req.body
  try {
    const user = await getPasswordUser({id: req.session.userId})
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(401).json(apiResponse(false, 'incorect password', null, 401))

    req.session.destroy(() => {
      res.status(200).json(apiResponse(true, 'logout successfully', null))
    })
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}

exports.checkUserSession = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json(apiResponse(false, 'you are not logged in', null, 401))
    
    const user = await getUserById({id: req.session.userId})
    res.status(200).json(apiResponse(true, 'you are logged in', user))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers()
    res.status(200).json(apiResponse(true, 'get all users data', users))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}

exports.getUserById = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const user = await getUserById({id})
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
