CREATE TABLE user_flag (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id integer NOT NULL,
  flag_id integer NOT NULL,
  variant_id integer,
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone DEFAULT NOW()
);

ALTER TABLE user_flag ADD CONSTRAINT user_flag_user 
FOREIGN KEY (user_id) REFERENCES user_account(id);

ALTER TABLE user_flag ADD CONSTRAINT user_flag_flag 
FOREIGN KEY (flag_id) REFERENCES flag(id);

ALTER TABLE user_flag ADD CONSTRAINT user_flag_variant
FOREIGN KEY (variant_id) REFERENCES flag_variant(id);
