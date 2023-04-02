import { Knex } from "knex";
import { FeatureFlagType } from "../../generated/types";

const TABLE_NAME = 'feature_flags';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(TABLE_NAME).del();
    await knex.raw(`ALTER SEQUENCE ${TABLE_NAME}_id_seq RESTART WITH 1`);
    await knex.raw(`UPDATE ${TABLE_NAME} SET id = DEFAULT`);

    const records = [{
        key: 'BETA_TESTER',
        type: FeatureFlagType.Boolean,
        value: 'false'
    }, {
        key: 'CHECKOUT FLOW',
        type: FeatureFlagType.String,
        value: 'one click'
    }];

    // Inserts seed entries
    await knex(TABLE_NAME).insert(records);
};
