const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class RatesControllers{  

  async throwStudentGrade(req, res){
    const {student_id, student_grade, subject} = req.body //a nota do aluno e o aluno que vai receber esta nota quando for pesquisado pelo prof
    const user_id = req.user.id //o professor authenticado na aplicacao
    if(student_id && student_grade && user_id){
      await knex('Grades')
      .insert({
        teacher_id : user_id, // id do professor que lancou a nota para retornar qual foi o professor que lancou
        student_grade, //nota do estudante
        student_id, //id que vai referenciar ele na hora de retornar as notas dele
        subject // materia a qual esta nota esta sendo lancada
      })
      .then(()=> {
        console.log('inserted with success')
        return res.status(201).json({message : "grade threw"})
      })
      .catch (e => {
        console.log(e)
        return res.status(500).json({message : "error"})
      })
    }
  }
  async visualizeGrades(req, res){
    const { subject , } = req.body
    const user_id = req.user.id
    if(subject) {
      const studentsGrades = await knex('Grades')
      .select(["subject" , "student_grade", "teacher_name"])
      .whereLike("subject", `%${subject}%`) 
      .where({student_id : user_id})
      .innerJoin('teachers', 'Grades.teacher_id', 'teachers.id')
      .orderBy("student_grade")
      

      const studentInfo = await knex('students')
      .select([ "name", "cpf", "email", "username"])
      .where({id : user_id})
      .first()
    
      return res.status(200).json({studentsGrades, studentInfo})
    } 
    const studentsGrades = await knex('Grades')
      .select(["subject" , "student_grade", "teacher_name"])
      .whereLike("subject", `%${subject}%`) 
      .where({student_id : user_id})
      .innerJoin('teachers', 'Grades.teacher_id', 'teachers.id')
      .orderBy("subject")
    
  }

 
}
module.exports = RatesControllers