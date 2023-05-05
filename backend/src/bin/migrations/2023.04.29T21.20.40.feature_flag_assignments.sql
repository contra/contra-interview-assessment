CREATE TABLE feature_flag_assignments (
  user_id integer NOT NULL,
  feature_flag_id integer NOT NULL,
  value text NOT NULL,
  PRIMARY KEY (user_id, feature_flag_id),
  FOREIGN KEY (user_id) REFERENCES user_account (id) ON DELETE CASCADE,
  FOREIGN KEY (feature_flag_id) REFERENCES feature_flags (id) ON DELETE CASCADE
);