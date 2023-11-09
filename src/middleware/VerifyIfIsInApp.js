const knex = require('../database/knex') 
const AppError = require('../utils/AppError')
async function verifyUserIsInApp (req, res, next) {
  const { username, password, email, name, cpf } = req.body
  const userExistInStudents = await knex('students').where({email})
  const userExistsInTeachers = await knex('teachers').where({email})
  const userExistsInTeachersByCpf = await knex('teachers').where({cpf})
  const userExistsInStudentsByCpf = await knex('teachers').where({cpf})
  if(userExistInStudents || userExistsInTeachers)throw new AppError('E-mail já utilizado.', 401) 
  if(userExistsInStudentsByCpf || userExistsInTeachersByCpf)throw new AppError('CPF já utilizado.', 401)
  return next()
}
module.exports = verifyUserIsInApp