CREATE TABLE flag (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  flag_name text NOT NULL,
  is_on boolean NOT NULL,
  env text,
  description text,
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone DEFAULT NOW()
);
