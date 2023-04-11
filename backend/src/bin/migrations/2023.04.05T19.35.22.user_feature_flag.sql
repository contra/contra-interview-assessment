CREATE TABLE user_feature_flag (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  feature_id integer NOT NULL,
  user_id integer NOT NULL,
  flag jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone DEFAULT NOW()
);

ALTER TABLE user_feature_flag
ADD CONSTRAINT fk_feature_id
FOREIGN KEY (feature_id)
REFERENCES feature(id);

ALTER TABLE user_feature_flag
ADD CONSTRAINT fk_user_id
FOREIGN KEY (user_id)
REFERENCES user_account(id);

ALTER TABLE user_feature_flag
ADD CONSTRAINT uc_feature_user
UNIQUE (feature_id, user_id);

CREATE INDEX user_feature_flag_user_id_idx ON user_feature_flag(user_id);
CREATE INDEX user_feature_flag_feature_id_idx ON user_feature_flag(feature_id);
