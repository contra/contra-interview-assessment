CREATE TABLE feature_flag (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  flag_key text NOT NULL UNIQUE,
  flag_type text NOT NULL,
  default_value text,
  created_at timestamp with time zone DEFAULT NOW()
);

CREATE TABLE feature_flag_user_value (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  feature_flag_fk integer REFERENCES feature_flag (id) ON DELETE CASCADE NOT NULL,
  user_account_fk integer REFERENCES user_account (id) ON DELETE CASCADE NOT NULL,
  flag_value text NOT NULL,
  created_at timestamp with time zone DEFAULT NOW(),
  UNIQUE (feature_flag_fk, user_account_fk)
);
