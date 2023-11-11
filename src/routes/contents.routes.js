const express = require('express')
const ContentsControllers = require('../controllers/contentsControllers')
const contentsControllers = new ContentsControllers()
const ensureAuth = require('../middleware/ensureAuthenticated')
const contentsRoutes = express()
contentsRoutes.use(express.json())


//route for an teacher uses, in the frontend will have an bool variable thats we can see if its an teacher or an student
contentsRoutes.post('/create-content', ensureAuth, contentsControllers.createContent )

contentsRoutes.put('/update-content', ensureAuth, contentsControllers.updateContent )

contentsRoutes.delete('/delete-content', ensureAuth, contentsControllers.deleteContent )

contentsRoutes.get('/view-content', ensureAuth, contentsControllers.viewAllContents )


module.exports = contentsRoutes