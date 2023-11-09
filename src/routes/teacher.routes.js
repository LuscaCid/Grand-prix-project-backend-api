const express = require('express')
const teacherRoutes = express()
const TeacherControllers = require('../controllers/teacherControllers')
const teacherControllers = new TeacherControllers()
const verifyUserIsInApp = require('../middleware/VerifyIfIsInApp')

teacherRoutes.use(express.json())

/**
 * criacao de turma
 * adicionar links às turmas (criacao de video)
 * adicionar conteudos na pagina da turma
 * 
 */
teacherRoutes.post('/teacher/register', teacherControllers.createAccount )

teacherRoutes.put('/teacher/update', teacherControllers.updateAccount)

module.exports = teacherRoutes