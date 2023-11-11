

exports.up = knex => knex.schema.createTable('classPartner', table => {
  table.increments('id').primary()
  
  table.integer("class_id").references('id').inTable('classroom')
  //chave que referencia o id da turma q o estudante faz parte
  
  table.integer("student_id").references('id').inTable('students')
  //chave que vai referenciar o estudante da class

}) 
exports.down = knex=> knex.schema.dropTable('classPartner')
