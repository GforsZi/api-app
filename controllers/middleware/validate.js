const apiResponse = require('../../utils/apiRespone')

module.exports = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body)
  if (error) return res.status(401).json(apiResponse(false, error.details[0].message, null, 401))
  next()
}
