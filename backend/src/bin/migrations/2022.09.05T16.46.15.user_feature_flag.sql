CREATE TABLE user_feature_flag (
  user_id integer NOT NULL,
  feature_flag_id integer NOT NULL,
  feature_flag_value text NOT NULL,
  updated_at timestamp with time zone DEFAULT NOW(),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.user_account(id),
  CONSTRAINT fk_feature_flag_id FOREIGN KEY (feature_flag_id) REFERENCES public.feature_flag(id),
  CONSTRAINT pk_user_feature_flag PRIMARY KEY (user_id, feature_flag_id)
);
