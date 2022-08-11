import { faker } from '@faker-js/faker';
import { createPool, sql } from 'slonik';

if (!process.env.POSTGRES_CONNECTION_STRING) {
    throw new Error(
        'Must provide a PG connection string (export POSTGRES_CONNECTION_STRING=value) -- if you need a fresh database, we recommend using Render.com',
    );
}

const slonik = createPool(process.env.POSTGRES_CONNECTION_STRING);

/**
 * Use faker to seed database
 */

const seedUsers = async (usersCount: number) => {
    const users = new Array(usersCount).fill(undefined).map(() => ([
        faker.name.firstName(),
        faker.name.lastName(),
    ])).map((user) => ([
        ...user,
        faker.internet.email(user[0], user[1]).toLowerCase()
    ]));
    await slonik.query(sql`
        INSERT INTO user_account (given_name, family_name, email_address)
        SELECT *
        FROM ${sql.unnest(
        users,
        new Array(3).fill('text')
    )}
    `);
};

const seedFlags = async (flagsCount: number) => {
    // Total records = flagsCount * 3
    const flagNames = new Array(flagsCount).fill(undefined).map(() => (
        [`${faker.word.adjective()}-${faker.word.noun()}`]
    ));
    const flags = flagNames.map(([flagName]) => {
        return ['dev', 'stag', 'prod'].map((environment) => [flagName, environment, faker.datatype.boolean()])
    }).flat();
    await slonik.query(sql`
        INSERT INTO flag (flag_name, env, is_on)
        SELECT *
        FROM ${sql.unnest(
        flags,
        ['text', 'text', 'bool']
    )}
    `);
};

// Seed variants for 1 of the existing flags
const seedVariants = async (variantsCount: number) => {
    const flag = await slonik.one<{ id: number }>(
        sql`SELECT id FROM flag WHERE MOD(id, 5) = 0 LIMIT 1;`,
    );
    const variants = faker.helpers.uniqueArray(faker.color.human, variantsCount).map((color) => ([flag.id, color]));
    await slonik.query(sql`
        INSERT INTO flag_variant (flag_id, variant_name)
        SELECT *
        FROM ${sql.unnest(
        variants,
        ['int4', 'text']
    )}
    `);
};

// Seed flags for 10% of the users
const seedUserFlags = async (usersPercentage: number) => {
    const userIds = await slonik.many<{ id: number }>(sql`
        SELECT id
        FROM   user_account
        ORDER BY RANDOM()
        LIMIT (SELECT COUNT(1)*${usersPercentage}/100 FROM user_account)
    `);
    const flagIds = await slonik.many<{ id: number }>(sql`
        SELECT id
        FROM   flag
    `);
    const variantIds = await slonik.many<{ id: number, flag_id: number }>(sql`
        SELECT id, flag_id
        FROM   flag_variant
    `);
    const flagIdWithVariants = variantIds?.[0]?.flag_id ?? undefined;

    const userFlags = userIds.map((user) => {
        const flagId = faker.helpers.arrayElement(flagIds).id;

        return ([user.id, flagId, flagId === flagIdWithVariants ? faker.helpers.arrayElement(variantIds).id : null]);
    });
    await slonik.query(sql`
        INSERT INTO user_flag (user_id, flag_id, variant_id)
        SELECT *
        FROM ${sql.unnest(
        userFlags,
        ['int4', 'int4', 'int4']
    )}
`);
};

const seed = async () => {
    await seedUsers(1_000);
    await seedFlags(20);
    await seedVariants(5);
    await seedUserFlags(10);
}

seed();