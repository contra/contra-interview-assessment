require('dotenv').config();

import { createPool, sql } from 'slonik';

if (!process.env.POSTGRES_CONNECTION_STRING) {
  throw new Error(
    'Must provide a PG connection string (export POSTGRES_CONNECTION_STRING=value) -- if you need a fresh database, we recommend using Render.com',
  );
}
const pool = createPool(process.env.POSTGRES_CONNECTION_STRING);

async function seedData() {
  pool.connect(async (connection) => {
    await connection.query(sql`SELECT 1`);
  });

  await pool.query(sql`
  INSERT INTO
  public.user_account (
    id,
    given_name,
    family_name,
    email_address,
    created_at,
    updated_at
  )
VALUES
(
    '1',
    'tiago',
    'Gomes',
    'tiago@mail.com',
    '2012-01-01 00:00:00.000',
    '2022-08-02 16:24:26.143'
  );
`);

  await pool.query(sql`
INSERT INTO
public.user_account (
  id,
  given_name,
  family_name,
  email_address,
  created_at,
  updated_at
)
VALUES
(
  '2',
  'Jon',
  'Florence',
  'jon@mail.com',
  '2012-01-01 00:00:00.000',
  '2022-08-02 16:24:26.143'
);
`);

  await pool.query(sql`
INSERT INTO
public.user_account (
  id,
  given_name,
  family_name,
  email_address,
  created_at,
  updated_at
)
VALUES
(
  '3',
  'Tom',
  'Davis',
  'tom.davis@mail.com',
  '2012-01-01 00:00:00.000',
  '2022-08-02 16:24:26.143'
);
`);

  await pool.query(sql`
INSERT INTO
public.feature_flag (
  id,
  user_id,
  flag_key,
  flag_value,
  created_at,
  updated_at
)
VALUES
(
  '1',
  '1',
  'background',
  'green',
  '2022-08-02 00:00:00.000',
  '2022-08-02 16:24:26.143'
);
`);

  await pool.query(sql`
INSERT INTO
public.feature_flag (
  id,
  user_id,
  flag_key,
  flag_value,
  created_at,
  updated_at
)
VALUES
(
  '2',
  '1',
  'isBeta',
  'true',
  '2022-08-02 00:00:00.000',
  '2022-08-02 16:24:26.143'
);
`);

  await pool.query(sql`
INSERT INTO
public.feature_flag (
  id,
  user_id,
  flag_key,
  flag_value,
  created_at,
  updated_at
)
VALUES
(
  '3',
  '2',
  'isBeta',
  'false',
  '2022-08-02 00:00:00.000',
  '2022-08-02 16:24:26.143'
);
`);

  await pool.end();
}

seedData();
