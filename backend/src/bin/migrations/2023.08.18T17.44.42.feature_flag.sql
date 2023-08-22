CREATE TABLE feature_flag (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL UNIQUE,
  possible_values jsonb NOT NULL
);