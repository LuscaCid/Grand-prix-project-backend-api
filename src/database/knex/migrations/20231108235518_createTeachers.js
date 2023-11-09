
exports.up = knex => knex.schema.createTable('teachers', (table) => {
  table.increments('id').primary()
  table.text('name')
  table.text('username')
  table.text('cpf')
  table.text('email')
  table.text('password')
  table.timestamp('created_at').default(knex.fn.now())
  table.timestamp('updated_at').default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable('teachers')
