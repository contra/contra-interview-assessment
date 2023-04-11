CREATE TABLE feature (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  feature_name text NOT NULL,
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone DEFAULT NOW()
);
