
exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments().unsigned().primary();
    table.string('username').unique().notNullable();
    table.string('display_name').unique().notNullable();
    table.string('provider').notNullable();
    table.boolean('admin').notNullable().defaultTo(false);
    table.string('twitter_access_token').unique();
    table.string('twitter_access_secret').unique();
    table.string('twitter_id').unique();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users');
};
