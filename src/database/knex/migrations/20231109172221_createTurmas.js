
exports.up = knex => knex.schema.createTable('turmas', table => {
    table.increments('id')
    table.text('Subject').notNullable()//materia da turma
    table.integer('teacher_id').references('id').inTable('teachers')
    table.timestamp('created_at').default(knex.fn.now())
    table.integer('qtd_students') // sempre q eu criar um aluno e colocar nesta turma de id ... esse registro de turma sera atualizado incrementando 1 ao valor de qtd_students
})

exports.down = function(knex) {
  
};


/**
 * o aluno em especifico precisa ter o turma_id que vai referenciar
 * quando o professor criar uma turma e adicionar alunos a ela
 * essa eh a ideia principal
 * 
 * o registro 
 * lucas 
 * 110819970522
 * turma_id : 4
 * 
 * ou seja, faco parte da turma que tem id 4
 * 
 * quem lança nota eh o professor, logo quando ele criar um registro 
 * dentro da tabela notas, ele vai referenciar para o aluno
 * 
 * ou seja, 
 * lucas cujo rate_id : id do registro de criacao de uma tabela Rates
 * 
 * 
 * na tabela rates tera apenas uma nota, ou seja 
 * serao lancadas, criados outros registros dentro da table rates para 
 * 2, 3 provas, ou seja, 3 registros possuindo o mesmo registro na area
 * de student_id
 */