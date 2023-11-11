const express = require('express')
const gradesRoutes = express()
const GradeControllers = require('../controllers/gradesControllers')
const ensureAuth = require('../middleware/ensureAuthenticated')
const gradesControllers = new GradeControllers()
gradesRoutes.use(express.json())

gradesRoutes.post('/throw-grade', ensureAuth, gradesControllers.throwStudentGrade)

gradesRoutes.get('/visualize-grade', ensureAuth, gradesControllers.visualizeGrades)

module.exports = gradesRoutes