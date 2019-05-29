
exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments().unsigned().primary();
    table.string('username').unique().notNullable();
    table.string('displayName').unique().notNullable();
    table.string('provider').notNullable();
    table.boolean('admin').notNullable().defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users');
};