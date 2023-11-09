require('express-async-errors');
const AppError = require('./utils/AppError')
const cors = require('cors');
const express = require('express');
const PORT = 5555;
const teacherRoutes = require('./routes/teacher.routes')
const studentRoutes = require('./routes/students.routes')

const app = express();
app.use(cors());
app.use(express.json())
app.use(teacherRoutes)
app.use(studentRoutes)
app.use((error, req, res, next)=> {  
  if(error instanceof AppError){
    return res.status(error.status).json({
      message : error.message,
      status : error.status
    })
  }
  return res.status(500).json({
    message : "Internal Server Error",
    status : 500
  })
})

app.listen(PORT, ()=>console.log('Server is running at port: '+ PORT));
