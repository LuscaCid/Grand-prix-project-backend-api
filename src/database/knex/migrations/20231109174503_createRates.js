
exports.up = knex => knex.schema.createTable('Rates',table => {
    table.increments('id')
    table.integer('student_id')
    table.text('subject').notNullable()
    table.float('Rate').notNullable()
    table.timestamp('created_at').default(knex.fn.now())
})
exports.down = knex => knex.schema.dropTable('Rates')
