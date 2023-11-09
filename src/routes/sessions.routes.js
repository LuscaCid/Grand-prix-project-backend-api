const express= require('express')
const StudentSessionsControllers = require('../controllers/student-sessions-controllers')
const TeacherSessionsControllers = require('../controllers/teacher-sessions-controllers')
const sessionsRoutes = express()
const studentSessionsControllers = new StudentSessionsControllers()
const teacherSessionsControllers = new TeacherSessionsControllers()
sessionsRoutes.use(express.json())

sessionsRoutes.post('/teacher-sessions', teacherSessionsControllers.createLogon)


module.exports=sessionsRoutes