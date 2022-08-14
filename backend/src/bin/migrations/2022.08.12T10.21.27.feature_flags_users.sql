CREATE TABLE feature_flag_users (
    flag_id int REFERENCES feature_flag(id) ON DELETE CASCADE,
    user_id int REFERENCES user_account(id) ON DELETE CASCADE,
    flag_value text NOT NULL,
    CONSTRAINT flag_user_pkey PRIMARY KEY (flag_id, user_id) 
);