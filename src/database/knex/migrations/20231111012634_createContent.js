
exports.up = knex => knex.schema.createTable('contents', table => {
  table.increments('id')
  table.text('title')
  table.text('description')
  table.text('video_url') //a ideia é ele postar uma vez um video, e nao varios links
  table.integer('class_id').references('id').inTable('classroom').onDelete('CASCADE')
  table.timestamp('created_at').default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable('contents')
