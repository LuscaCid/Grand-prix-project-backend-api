const express= require('express')

const SessionsControllers = require('../controllers/sessions-controllers')
const sessionsRoutes = express()

const sessionsControllers = new SessionsControllers()

sessionsRoutes.use(express.json())


//rota de login na aplicacao
sessionsRoutes.post('/sessions', sessionsControllers.createLogon)



module.exports=sessionsRoutes
/**
 * posso ter em minha aplicacao apenas um login,
 * ele vai fazer login, porem vai identificar de qual tabela ele
 * tirou os dados e vai redirecionar se eh professor ou aluno
 * ele pode fazer consulta nas duas ora, de alguma ele pode tirar
 * 
 */