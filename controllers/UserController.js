const { getAllUsers, createUser, updateUser } = require("../models/UserModel.js");
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
  console.log(req.body);
  try {
    const { email, name, job } = req.body;
    createUser({ email, name, job });
    res.status(201).json(apiResponse(true, "create users data", 201));
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500));
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    updateUser({ name, email, password });
    res.status(201).json(apiResponse(true, "update users data", 201));
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500));
  }
};