const express = require('express')
const studentRoutes = express()
const StudentControllers = require('../controllers/studentControllers')
const studentControllers = new StudentControllers()
const verifyUserIsInApp = require('../middleware/VerifyIfIsInApp')

studentRoutes.use(express.json())

/**
 * criacao de turma
 * adicionar links às turmas (criacao de video)
 * adicionar conteudos na pagina da turma
 * 
 */
studentRoutes.post('/student-register', verifyUserIsInApp, studentControllers.createAccount )

studentRoutes.put('/student-update', studentControllers.updateAccount )
module.exports = studentRoutes