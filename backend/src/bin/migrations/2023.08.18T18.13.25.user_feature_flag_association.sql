CREATE TABLE user_feature_flag_association (
  user_id integer REFERENCES user_account(id) ON DELETE CASCADE,
  feature_flag_id integer REFERENCES feature_flag(id) ON DELETE CASCADE,
  value jsonb NOT NULL,
  PRIMARY KEY(user_id, feature_flag_id)
);
