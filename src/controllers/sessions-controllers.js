const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const { compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')
const authConfig = require('../config/authConfig')

class SessionsControllers {

  
  async createLogon(req, res){
    //receberei um boolean informando se eh aluno ou prof


    const {email , password, isStudent} = req.body
  
    const user = await knex(isStudent ? 'students' : 'teachers').where({email}).first()
    
    if(!user)throw new AppError('E-mail ou senha inválidos', 401)
    
    const checkPassoword = await compare(password, user.password)
    
    if(!checkPassoword)throw new AppError('E-mail ou senha inválidos', 401)
    
    const {secret, expiresIn} = authConfig.jwt
    
    const token = sign({}, secret, {
      subject : String(user.id),
      expiresIn
    })

    return res.status(201).json({user, token})
  }

}
module.exports = SessionsControllers