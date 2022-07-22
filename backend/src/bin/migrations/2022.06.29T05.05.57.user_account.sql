CREATE TABLE user_account (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  given_name text NOT NULL,
  family_name text NOT NULL,
  email_address text NOT NULL,
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone DEFAULT NOW()
);

