const { getAllUsers, createUser } = require("../models/UserModel.js");
const apiResponse = require("../utils/apiRespone.js");

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(apiResponse(true, "get all users data", users));
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500));
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await createUser({ name, email, password });
    res.status(201).json(apiResponse(true, "get all users data", newUser, 201));
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500));
  }
};