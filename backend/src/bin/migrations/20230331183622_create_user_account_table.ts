import { Knex } from "knex";

const TABLE_NAME = 'user_account';
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, function(table) {
    table.increments('id', { primaryKey: true });
    table.string('given_name').notNullable();
    table.string('family_name').notNullable();
    table.string('email_address').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}

