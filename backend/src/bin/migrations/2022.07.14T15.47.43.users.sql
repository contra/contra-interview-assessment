CREATE TYPE feature_flag_assignment AS (
  id TEXT,
  value TEXT,
  value_type TEXT
);

CREATE TABLE users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  given_name TEXT NOT NULL,
  family_name TEXT NOT NULL,
  email_address TEXT NOT NULL UNIQUE,
  feature_flag_assignments feature_flag_assignment[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER refresh_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE PROCEDURE refresh_updated_at_column();