CREATE TABLE feature_flag (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id int references user_account(id),
  name text NOT NULL,
  value jsonb NOT NULL
);

CREATE INDEX IF NOT EXISTS feature_flag_name_index on feature_flag (name);
CREATE UNIQUE INDEX feature_flag_user_id_name_uindex on feature_flag (user_id, name);
