CREATE TABLE feature_flags (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  value text NOT NULL,
  value_type text NOT NULL,
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone DEFAULT NOW()
);