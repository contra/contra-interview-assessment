CREATE TABLE feature_flags_user_map (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  feature_flag_id integer,
  user_id integer,
  flag_boolean boolean,
  flag_multivariate text,
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone DEFAULT NOW(),
  constraint fk_feature_flag Foreign Key (feature_flag_id) references feature_flags(id),
  constraint fk_user_id Foreign Key (user_id) references user_account(id),
  UNIQUE(feature_flag_id, user_id)
);
