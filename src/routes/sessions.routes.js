const express= require('express')
const SessionsControllers = require('../controllers/student-sessions-controllers')
const sessionsRoutes = express()
const sessionsControllers = new SessionsControllers()

sessionsRoutes.use(express.json())

sessionsRoutes.post('/sessions')


module.exports=sessionsRoutes