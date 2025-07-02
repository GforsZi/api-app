// models/userModel.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const {toLocalTime} = require('../utils/convertTimezone')

const getAllUsers = async () => {
const users = await prisma.users.findMany()

  
const result = users.map(user => ({
  id: user.id,
  name: user.name,
  email: user.email,
  password: user.password,
  createdAt: toLocalTime(user.createdAt),
  updatedAt: toLocalTime(user.updatedAt),
}));

return result
}

const getUsers = async (data) => {
  let user = await prisma.users.findUnique({
    where: { id: data.id },
  })

  const value = {
  id: user.id,
  name: user.name,
  email: user.email,
  password: user.password,
  createdAt: toLocalTime(user.createdAt),
  updatedAt: toLocalTime(user.updatedAt),
  }
  
  return value
}

const getPasswordUser = async (data) => {
  const userPassword = await prisma.users.findFirst({
    where: {id: data.id},
    select: {password: true}
  })

  return userPassword
}

const createUser = async (data) => {
  await prisma.users.create({
    data: { email: data.email, name: data.name, password: data.password },
  })
}

const updateUser = async (data) => {
  await prisma.users.update({
    where: { id: data.id },
    data: { email: data.email, name: data.name },
  })
}

const changeUserPassword = async (data) => {
  await prisma.users.update({
    where: { id: data.id },
    data: { password: data.password },
  })
}

const deleteUser = async (data) => {
  await prisma.users.delete({
    where: { id: data.id },
  })
}

module.exports = { getAllUsers, getUsers, getPasswordUser, createUser, updateUser, changeUserPassword, deleteUser }
