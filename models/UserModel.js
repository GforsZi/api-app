// models/userModel.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const Joi = require('joi')

const schema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  name: Joi.string().max(155).required(),
  job: Joi.string().max(155).required(),
})

const getAllUsers = async () => await prisma.users.findMany()
const createUser = async (data) => {

  
let validation = schema.validate({
  email: data.email,
  name: data.name,
  job: data.job,
})

let result = validation.value

await prisma.users.create({ data: { email: result.email, name: result.name, job: result.job } })
}

const updateUser = async (data) => {
  
  let validation = schema.validate({
    id: data.id,
    email: data.email,
    name: data.name,
    job: data.job,
  })

  let result = validation.value
  await prisma.users.update({
    where: { id: parseInt(result.id) },
    data: { email: result.email, name: result.name, job: result.job },
  })
}

const deleteUser = async (data) => {
  await prisma.users.delete({
    where: { id: parseInt(data.id) }
  })
}

module.exports = { getAllUsers, createUser, updateUser, deleteUser }
