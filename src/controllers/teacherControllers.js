const { hash, compare } = require('bcrypt')
const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class TeacherControllers {
  async createAccount(req,res) { 
    const { username, password, email, name, cpf } = req.body
    console.log('chegou')
    const hashedPassword = await hash(password , 8)

      const user = await knex('teachers')
      .insert({
        username, 
        password : hashedPassword, 
        email, 
        name, 
        cpf
      }).then(()=> console.log('created')).catch(e => console.log(e))

      return res.json(user)
    
      
      
    

  } 
  async updateAccount(req, res) { 
    const { user_id } = req.user
    const { newEmail , newPassword, oldPassword, newUsername } = req.body
    try {
      const exists = await knex('teachers').where({id : user_id}).first()
      if(exists){
        if(newEmail) { 
          const alreadyEmailInUse = await knex('teachers').where({email : newEmail})
          alreadyEmailInUse && alreadyEmailInUse.id == exists.id ? ()=> {throw new AppError('E-mail já em uso', 401)} : ()=> {
            knex('teachers')
            .where({id : exists.id})
            .update({email : newEmail})
          } 
        }
        if(newUsername) await knex('teachers').where({id : exists.id}).update({username : newUsername})
          
        if(oldPassword && newPassword) { 
          const passwordInDB = await knex('teachers').select("password").where({id : exists.id})

          const verify = await compare(oldPassword, passwordInDB)
          if(!verify)throw new AppError('As senhas não coincidem')
        }
      }

    } catch (error) {
      return console.log(error)
    }
    
    
  }
}

module.exports = TeacherControllers

/**
 * id,      // professor
 * name,
 * username,
 * cpf,
 * email,
 * password,  // teacher
 * 
 * 
 * 
 */