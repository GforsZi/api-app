// models/userModel.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUsers = () => prisma.user.findMany();
const createUser = (data) => prisma.user.create({ data });

module.exports = { getAllUsers, createUser };
