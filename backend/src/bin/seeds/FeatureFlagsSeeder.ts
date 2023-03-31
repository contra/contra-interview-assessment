import { Knex } from "knex";

const TABLE_NAME = 'feature_flags';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(TABLE_NAME).del();
    await knex.raw(`ALTER SEQUENCE ${TABLE_NAME}_id_seq RESTART WITH 1`);
    await knex.raw(`UPDATE ${TABLE_NAME} SET id = DEFAULT`);

    const records = [{
        key: 'BETA_TESTER',
        type: 'TOGGLE',
        value: 'false'
    }, {
        key: 'CHECKOUT FLOW',
        type: 'MULTI_VARIATE',
        value: 'one click'
    }];

    // Inserts seed entries
    await knex(TABLE_NAME).insert(records);
};
