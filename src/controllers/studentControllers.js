const { hash, compare } = require('bcrypt')
const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class StudentControllers {
  async createAccount(req,res) { 
    const { username, password, email, name, cpf } = req.body

    const hashedPassword = await hash(password , 8)

    try {
      await knex('students')
      .insert({
        username, 
        password : hashedPassword, 
        email, 
        name, 
        cpf
      })
    } catch (error) { 
      console.log(error)
      return error
    }

  } 
  async updateAccount(req, res) { 
    const { user_id } = req.user
    const { newEmail , newPassword, oldPassword, newUsername } = req.body
    try {
      const exists = await knex('students').where({id : user_id}).first()
      if(exists){
        if(newEmail) { 
          const alreadyEmailInUse = await knex('students').where({email : newEmail})
          alreadyEmailInUse && alreadyEmailInUse.id == exists.id ? ()=> {throw new AppError('E-mail já em uso', 401)} : ()=> {
            knex('students')
            .where({id : exists.id})
            .update({email : newEmail})
          } 
        }
        if(newUsername) await knex('students').where({id : exists.id}).update({username : newUsername})
          
        if(oldPassword && newPassword) { 
          const passwordInDB = await knex('students').select("password").where({id : exists.id})

          const verify = await compare(oldPassword, passwordInDB)
          if(!verify)throw new AppError('As senhas não coincidem')
        }
      }

    } catch (error) {
      return console.log(error)
    }
    
    
  }
}

module.exports = StudentControllers