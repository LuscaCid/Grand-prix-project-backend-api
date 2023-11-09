const { sign, verify } = require('jsonwebtoken');
const authConfig = require('../config/authConfig');
const AppError = require('../utils/AppError');

const ensureAuth = (req,res,next)=> { 
  const authHeaders = req.headers.authorization
  if(!authHeaders) throw new AppError('jsonwebtoken not passed', 401)
  const [, token] = authHeaders.split(' ')
  try { 
    const {sub : user_id} = verify(token, authConfig.jwt.secret)
    req.user = {
      id:  Number(user_id)
    }
    return next()
  } catch {
    throw new AppError('jwt its invalid', 401)
  }
}
module.exports = ensureAuth