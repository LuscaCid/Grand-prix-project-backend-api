const express = require('express')
const ensureAuth = require('../middleware/ensureAuthenticated')
const userRoutes = express()
const UserControllers = require('../controllers/userControllers')
const userControllers = new UserControllers()
userRoutes.use(express.json())

userRoutes.put('/update-user', ensureAuth, userControllers.updateAccount)

userRoutes.post('/register', userControllers.createAccount )

userRoutes.get('/search-student', ensureAuth, userControllers.searchForStudent)

module.exports = userRoutes