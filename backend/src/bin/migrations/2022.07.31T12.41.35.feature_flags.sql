CREATE TABLE feature_flags (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(255) UNIQUE NOT NULL,
  is_boolean boolean NOT NULL DEFAULT true,
  default_value text,
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone DEFAULT NOW()
);

