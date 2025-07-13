const Joi = require('joi')

const schemaRegister = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  name: Joi.string().max(155).required(),
  password: Joi.string().max(155).required(),
  repeat_password: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
  }),
})
const schemaCreateUser = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  name: Joi.string().max(155).required(),
  password: Joi.string().max(155).required(),
  repeat_password: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
  }),
})

const schemaUpdateUser = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  name: Joi.string().max(155).required(),
})

const schemaChangePasswordUser = Joi.object({
  old_password: Joi.string().max(155).required(),
  new_password: Joi.string().max(155).required(),
  repeat_new_password: Joi.string().valid(Joi.ref('new_password')).required().messages({
    'any.only': 'Passwords do not match',
  }),
})

module.exports = { schemaRegister, schemaCreateUser, schemaUpdateUser, schemaChangePasswordUser }
