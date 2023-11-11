const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class ClassroomControllers{
  async deleteClassroom(req,res) {
    const {class_id} = req.body //ao clickar em deletar classe, ele vai buscar atraves do class_id presente no objeto renderizado
    try{
      await knex('classroom')
      .where({id : class_id})
      .delete()
      .catch(e => console.log(e))
    } catch(e){
      return console.log(e)
    }
    return res.status(200).json()
  }
  
  async createClass(req, res){
    const user_id = req.user.id

    const { name_id, subject } = req.body

    const alreadySubjectName = await knex('classroom')
    .where({name_id}).first()
    if(alreadySubjectName)throw new AppError('Nome da turma ja usado no sistema', 401)

    const classRoom = await knex('classroom')
    .insert({subject , teacher_id : user_id, name_id})

    res.status(201).json(classRoom)
  }

  async showStudentClasses(req, res){//a ideia eh retornar as turmas que o aluno está inserido
   
    const student_id = req.user.id 
    const studentPlusClasses = await knex('classPartner')
    .where({student_id})
    .innerJoin('classroom', 'classroom.id', 'classPartner.class_id')
    .innerJoin('teachers', 'classroom.teacher_id', 'teachers.id' )
    .orderBy('name_id')
    const filteredInfo = studentPlusClasses.map(element => {
      return {
        curso_id : element.class_id,
        titulo_curso : element.name_id,
        materia : element.subject,
        professor: element.teacher_name,
        professor_email: element.email
      }
    })

    return res.json(filteredInfo) 

  }
  async insertStudent(req,res) {
    
    const { student_id , class_id} = req.body

    try {
      const studentInClass= await knex('classPartner')
      .where({class_id})
      .where("student_id", student_id)
      .first()

      console.log(studentInClass)

      if(studentInClass)throw new AppError('student already in classroom', 401)

      const id_partner = await knex('classPartner')
      .insert({student_id , class_id}) //o id da turma que este aluno ta entrando

      const qtdStudents = await knex("classroom")
      .column("qtd_students")
      .where({id : class_id}).first()
      const {qtd_students} = qtdStudents
      console.log(qtd_students)
      if(!qtd_students){
        console.log('é undefined')
        let value = 1
         await knex('classroom')
        .where({id : class_id})
        .update("qtd_students", value)

      } else {
        console.log(qtd_students)
        let value = Number(qtd_students) + 1;
        await knex('classroom')
        .where({id : class_id})
        .update("qtd_students", value)
      }  
      
      return res.status(200).json({
        message : "inserted with success"
      })
    } catch (e){
      console.log(e)
      return res.json()
    }
  }
  async viewAllClasses(req, res){
    const user_id = req.user.id //id do professor que ta entrando, esse controler faz ele visualizar todas as turmas criadas por ele
    try {
      const classes = await knex('classroom')
      .where({teacher_id : user_id})
      console.log(classes)
      const currentTeacher = await knex('teachers').where({id : user_id}).first()

      const data = classes.map(element => {
        console.log(element.name_id)
        return {
          tittle : element.name_id,
          subject : element.Subject,
          class_id : element.id,
          teacher_name : currentTeacher.teacher_name
        }
      })
      return res.json(data)
    } catch (error){
      console.log(error)
    }
  
  }

  async viewInsideClassroom(req, res) { //every content inside the class its been uploaded there
    const {class_id} = req.body
    const student_id = req.user.id //will viewed by student that its inside of the current class
    
    try {
      const allClass = await knex('classPartner')
      .where({student_id}).where({class_id}).first()
      console.log(allClass)
      
      if(!allClass)throw new AppError('este aluno nao faz parte desta turma')
      
      const studentInfo = await knex('students').where({id : student_id}).first()
      const classInfo = await knex('classroom').where({id : allClass.class_id}).first()
      const teacherInfo = await knex('teachers').where({id : classInfo.teacher_id}).first()
      const contents = await knex('contents').where({class_id})
      const studentsInThisClass= await knex('classPartner').where({class_id})
      .innerJoin('students', 'students.id', 'classPartner.student_id')

      
      const classroomStudents = studentsInThisClass.map(element => {
        return {
          name : element.name,
          student_id : element.student_id,
          username : element.username
        }
      })

      console.log(allClass.teacher_id)
      return res.json({classroomStudents,studentInfo,classInfo,allClass , teacherInfo, contents})
    } catch (error){
      console.log(error)
    }

  }
}
module.exports = ClassroomControllers