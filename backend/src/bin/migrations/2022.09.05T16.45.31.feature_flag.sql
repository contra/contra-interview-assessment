CREATE TABLE feature_flag (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  feature_flag_key text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT NOW()
);
