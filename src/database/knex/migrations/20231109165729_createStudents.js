/**
 * students table where we have
 * name text
 * username
 * cpf
 * email
 * password
 * turma_id --> coluna que relaciona o aluno a uma tabela turmas
 * notas --> vai estar conectada com uma tabela notas
 */
exports.up = knex => knex.schema.createTable('students', table=> {
    table.increments('id')

    table.text('name')

    table.text('cpf')

    table.text('email')

    table.text('password')

    table.integer('turma_id')
    .references('id')
    .inTable('turmas')

    table.integer('rate_id')
    .references('student_id')
    .inTable('Rates')
    .onDelete("CASCADE")

    table.timestamp('created_at')
    .default(knex.fn.now())
    
    table.timestamp('updated_at')
    .default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable('students')
