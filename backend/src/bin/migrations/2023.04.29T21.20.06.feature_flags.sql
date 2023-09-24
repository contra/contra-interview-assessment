CREATE TABLE feature_flags (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  values text[] NOT NULL
);