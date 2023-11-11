const {hash, compare} = require('bcrypt')
const knex = require('../database/knex')
const AppError = require('../utils/AppError')
class UserControllers {

  async wipedata(req, res){//only for developers 
    await knex('students').delete()
    await knex('classroom').delete()
    await knex('Grades').delete()
    await knex('teachers').delete()
    await knex('classPartner').delete()
    await knex('contents').delete()
    return res.json()
  } /**its only do delete all the info in db */

  async createAccount(req,res) { 
    const { username, password, email, name, cpf , isStudent} = req.body

    const hashedPassword = await hash(password , 8)
    const userExists = await knex('students').where({email}).first()
    console.log(userExists)
    if(userExists)throw new AppError('E-mail em uso.')
    try {
      await knex(isStudent ? 'students' : 'teachers')
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
      return res.status(400).json({message: 'erro nessa funcao'})
    }

  } 
  async updateAccount(req, res) {
    const user_id = req.user.id
  
    const { newEmail , newPassword, oldPassword, newUsername , isStudent} = req.body
    console.log(isStudent)
   
      const exists = await knex(isStudent ? 'students' : 'teachers')
      .where({id : user_id})
      .first()
      if(exists){
        if(newEmail) { 
          const alreadyEmailInUse = await knex('students')
          .where({email : newEmail})
          .first()
          const alreadyEmailTeacher = await knex('teachers')
          .where({email : newEmail})
          .first()
          if(alreadyEmailInUse && alreadyEmailInUse.id != exists.id || alreadyEmailTeacher && alreadyEmailTeacher.id != exists.id){
            console.log('email ja usado')
            throw new AppError('E-mail ja utilizado na aplicacao', 401)
          }
        
          await knex(isStudent ? 'students' : 'teachers')
          .where({id : exists.id})
          .update("email" , newEmail)
        console.log(e)

        }
        if(newUsername){
          const alreadyUsernameInUse = await knex(isStudent ? 'students' : 'teachers').where({username : newUsername}).first()

          if(alreadyUsernameInUse && alreadyUsernameInUse.id != exists.id)throw new AppError('Nickname já usado.',401)

          await knex(isStudent ? 'students' : 'teachers')
          .where({id : exists.id})
          .update({username : newUsername})
        } 
          
        if(oldPassword && newPassword) { 
        
          const passwordInDB = await knex(isStudent ? 'students' : 'teachers')
          .where({id : exists.id})
          .first()

          console.log(passwordInDB.password )

          const verify = await compare(oldPassword ,passwordInDB.password)
          if(!verify)throw new AppError('As senhas não coincidem!')
          
          const hashedPassword = await hash(newPassword, 8)
          await knex(isStudent ? 'students' : 'teachers')
          .where({id : exists.id}).update("password", hashedPassword)
      
        }
        return res.status(200).json({
          message : "updated with success"
        })
    }
    throw new AppError('User not found, prob wit jwt')
    
  }
  async searchForStudent(req, res){//procurar por um aluno em toda a aplicacao e retornar o seu id como sendo student_id para usar 
    const {name , username} = req.body
    const searchedStudents = await knex('students')
    .column(["name", "username", "cpf", "email"])
    .whereLike("name", `%${name}%`)    

    if(username){
      const studentsUsername = await knex('students')
      .column(["name", "username", "cpf", "email"])
      .whereLike("username", `%${username}%`)   
      .whereLike("name", `%${name}%`)   

    return res.json( studentsUsername)

    }
    return res.json(searchedStudents)
  }//haverao dois campos de busca, tanto pelo name quanto pelo username
  //no front end vou criar um botao que redireciona para uma tela de lancar notas ao clickar no aluno gerado no button
}
module.exports = UserControllers