CREATE INDEX IDX_FEATURE_FLAGS_NAME ON feature_flags (name);
CREATE INDEX IDX_FEATURE_FLAG_ID_USER_ID ON feature_flags_user_map (feature_flag_id, user_id);
