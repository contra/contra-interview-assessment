CREATE TABLE user (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  given_name text NOT NULL,
  family_name text NOT NULL,
  email_address text NOT NULL,
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone DEFAULT NOW()
);

CREATE TABLE feature_flags (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    value BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE user_feature_flags (
    user_id INT REFERENCES users(id),
    feature_flag_id INT REFERENCES feature_flags(id),
    PRIMARY KEY (user_id, feature_flag_id)
);