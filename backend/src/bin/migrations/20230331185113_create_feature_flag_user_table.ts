import { Knex } from "knex";

const TABLE_NAME = 'feature_flag_user';
const FK_FEATURE_FLAG = 'fk_feature_flag';
const FK_USER = 'fk_user';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, function(table) {
    table.integer('feature_flag_id');
    table.integer('user_id');
    table.text('override');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    
    table.primary(['feature_flag_id', 'user_id']);
    table.foreign('feature_flag_id')
      .references('feature_flags.id')
      .withKeyName(FK_FEATURE_FLAG);

    table.foreign('user_id')
      .references('user_account.id')
      .withKeyName(FK_USER);
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.table(TABLE_NAME, function(table) {
    table.dropForeign([], FK_FEATURE_FLAG);
    table.dropForeign([], FK_USER);
  });
  return knex.schema.dropTable(TABLE_NAME);
}

