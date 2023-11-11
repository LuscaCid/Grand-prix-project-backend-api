const express = require('express')
const ensureAuth = require('../middleware/ensureAuthenticated')
const ClassroomControllers = require('../controllers/classroomControllers')
const classroomControllers = new ClassroomControllers()

const classRoutes = express()
classRoutes.use(express.json())

classRoutes.get('/teacher-own-classes', ensureAuth, classroomControllers.viewAllClasses)

classRoutes.post('/create-class', ensureAuth, classroomControllers.createClass )

classRoutes.post('/insert-student', ensureAuth , classroomControllers.insertStudent)

classRoutes.get('/my-classes', ensureAuth, classroomControllers.showStudentClasses)

classRoutes.delete('/delete-class', ensureAuth, classroomControllers.deleteClassroom)

classRoutes.get('/classes', ensureAuth, classroomControllers.viewInsideClassroom)

module.exports = classRoutes

