import { faker } from '@faker-js/faker';
import { Knex } from "knex";

const TABLE_NAME = 'user_account';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(TABLE_NAME).del();
    await knex.raw(`ALTER SEQUENCE ${TABLE_NAME}_id_seq RESTART WITH 1`);
    await knex.raw(`UPDATE ${TABLE_NAME} SET id = DEFAULT`);

    const records = Array.from({ length: 10 }, () => {
        return {
            given_name: faker.name.firstName(),
            family_name: faker.name.lastName(),
            email_address: faker.internet.email()
        }
    });

    // Inserts seed entries
    await knex(TABLE_NAME).insert(records);
};
