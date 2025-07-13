// models/userModel.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { toLocalTime } = require('../utils/convertTimezone')

const getAllUsers = async () => {
  const users = await prisma.users.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      photoProfileUrl: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  const result = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    photoProfileUrl: user.photoProfileUrl,
    createdAt: toLocalTime(user.createdAt),
    updatedAt: toLocalTime(user.updatedAt),
  }))

  return result
}

const getUserById = async (data) => {
  let user = await prisma.users.findUnique({
    where: { id: data.id },
    select: { id: true, name: true, email: true, password: true, createdAt: true },
  })

  const value = {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: toLocalTime(user.createdAt),
  }

  return value
}

const getUserByEmail = async (data) => {
  let user = await prisma.users.findUnique({
    where: { email: data.email },
    select: { id: true, name: true, email: true, password: true },
  })
  return user
}

const getPasswordUser = async (data) => {
  const userPassword = await prisma.users.findFirst({
    where: { id: data.id },
    select: { password: true },
  })

  return userPassword
}

const registerAccount = async (data) => {
  $url = process.env.URL
  await prisma.users.create({
    data: {
      email: data.email,
      name: data.name,
      photoProfileUrl: `${$url}/images/default_profile_img.svg`,
      password: data.password,
    },
  })
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

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  getPasswordUser,
  createUser,
  registerAccount,
  updateUser,
  changeUserPassword,
  deleteUser,
}
