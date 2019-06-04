exports.up = (knex, Promise) => {
  return knex.schema.createTable('tweets', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned()
    table.foreign('user_id').references('users.id');
    table.string('tweet').notNullable()
    table.string('scheduled_time').notNullable()
    table.string('scheduled_date').notNullable()
    table.string('scheduled_for').notNullable()
    table.bool('sent').notNullable().default(false)
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('tweets');
};