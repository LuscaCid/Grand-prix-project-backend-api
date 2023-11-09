const { hash, compare } = require('bcrypt')
const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class TeacherControllers {
  async createAccount(req,res) { 
    const { username, password, email, name, cpf } = req.body

    const hashedPassword = await hash(password , 8)
    const userExists = await knex('teachers').where({email}).first()
    console.log(userExists)
    if(userExists)throw new AppError('E-mail em uso.')
    try {
      await knex('teachers')
      .insert({
        username, 
        password : hashedPassword, 
        email, 
        name, 
        cpf
      })
      return res.status(201).json()
    } catch (error) { 
      console.log(error)
      return res.status(error.status).json()
    }

  } 
  async updateAccount(req, res) { 
    const user_id = req.user.id
    
    const { newEmail , newPassword, oldPassword, newUsername } = req.body
    try {
      const exists = await knex('teachers').where({id : user_id}).first()
      if(exists){
        if(newEmail) { 
          const alreadyEmailInUse = await knex('teachers')
          .where({email : newEmail})
          .first()
          if(alreadyEmailInUse && alreadyEmailInUse.id != exists.id)throw new AppError('E-mail ja utilizado na aplicacao', 401)
          try { 
            await knex('teachers')
            .where({id : exists.id})
            .update("email" , newEmail)
            
        } catch(e) {
          console.log(e)
          }
        }
        if(newUsername){
          const alreadyUsernameInUse = await knex('teachers').where({username : newUsername}).first()

          if(alreadyUsernameInUse && alreadyUsernameInUse.id != exists.id)throw new AppError('Nickname já usado.')

          await knex('teachers')
          .where({id : exists.id})
          .update({username : newUsername})
        } 
          
        if(oldPassword && newPassword) { 
          try { 
            const passwordInDB = await knex('teachers')
            .where({id : exists.id})
            .first()

            console.log(passwordInDB.password )

            const verify = await compare(oldPassword ,passwordInDB.password)
            if(!verify)throw new AppError('As senhas não coincidem!')
            
            const hashedPassword = await hash(newPassword, 8)
            await knex('teachers')
            .where({id : exists.id}).update("password", hashedPassword)
          } catch (e) {
            console.log(e)
            return res.json(e)
          }
          
        }
      }

    } catch (error) {
      console.log(error)
      return res.status(500).json()

    }
    
    return res.status(200).json({
      message : "updated with success"
    })
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