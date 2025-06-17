// models/userModel.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()
const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  name: Joi.string().max(155).required(),
  job: Joi.string().max(155).required(),
})

const getAllUsers = () => prisma.user.findMany();
const createUser = (data) => {

  
  let validation = schema.validate({
    email: data["email"],
    name: data["name"],
    job: data["job"],
  })
  
  let result = validation["value"]
  console.log(result);
  
  prisma.user.create({data: result})
};
const updateUser = (data) => {
  
  let validation = schema.validate({
    "email": data["email"],
    "name": data["name"],
    "job": data["job"],
  })

  prisma.user.update({
  where: { id: data["id"] },
  data: validation,
});
};

module.exports = { getAllUsers, createUser, updateUser };
