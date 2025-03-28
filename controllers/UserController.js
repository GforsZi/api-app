const { getAllUsers, createUser } = require("../models/UserModel.js");

exports.landing = async (req, res) => {
  try {
    res.send('Hello express!')
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await createUser({ name, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};