require('express-async-errors');
const AppError = require('./utils/AppError')
const cors = require('cors');
const express = require('express');

const PORT = 5555;

const userRoutes = require('./routes/users.routes')
const sessionsRoutes = require('./routes/sessions.routes')
const classRoutes = require('./routes/classroom.routes')
const contentsRoutes = require('./routes/contents.routes')
const gradesRoutes = require('./routes/grades.routes')

const app = express();
app.use(express.json())
app.use(cors());


app.use(sessionsRoutes)
app.use(classRoutes)
app.use(userRoutes)
app.use(contentsRoutes)
app.use(gradesRoutes)

app.use((error, request, response, next)=>{
  if(error instanceof AppError){
      return response.status(error.status).json({
          status : "error",
          message : error.message
      })
  }
  console.error(error)
  return response.status(500).json({
      status : "500",
      message : "internal server error"
  })
})

app.listen(PORT, ()=>console.log('Server is running at port: '+ PORT));
