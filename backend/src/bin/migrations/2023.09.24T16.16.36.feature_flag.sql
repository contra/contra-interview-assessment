CREATE TYPE flag_types AS ENUM ('boolean', 'multi', 'text');

CREATE TABLE feature_flag (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  description TEXT NOT NULL,
  type flag_types default 'boolean',
  value text NOT NULL,
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone DEFAULT NOW()
);

CREATE TABLE user_feature_flag (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id integer REFERENCES user_account(id) on delete cascade,
  flag_id integer REFERENCES feature_flag(id) on delete cascade,
  value text,
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_user_feature_flag ON user_feature_flag (user_id, flag_id)