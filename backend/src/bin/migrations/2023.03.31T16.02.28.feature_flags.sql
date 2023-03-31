CREATE TABLE feature_flags (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  key text NOT NULL,
  type varchar NOT NULL,
  value text NOT NULL,
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone DEFAULT NOW()
);