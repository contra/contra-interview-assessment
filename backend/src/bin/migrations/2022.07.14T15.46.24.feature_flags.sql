CREATE TYPE user_assignment AS (
  id INTEGER,
  value TEXT,
  value_type TEXT
);

CREATE TABLE feature_flags (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  user_assignments user_assignment[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER refresh_feature_flags_updated_at
BEFORE UPDATE ON feature_flags
FOR EACH ROW EXECUTE PROCEDURE refresh_updated_at_column();