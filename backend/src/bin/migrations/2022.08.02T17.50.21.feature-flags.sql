CREATE TABLE feature_flag (
  id serial PRIMARY KEY,
  user_id int NOT NULL,
  flag_key text NOT NULL,
  flag_value text NOT NULL,
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES user_account (id));

