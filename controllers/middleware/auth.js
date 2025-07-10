const apiResponse = require('../../utils/apiRespone')

exports.loginAuth = (req, res, next) => {
  
  if (!req.session.userId) {
    return res.status(401).json(apiResponse(false, 'you are not logged in', null, 401))
  }
  next()
}
