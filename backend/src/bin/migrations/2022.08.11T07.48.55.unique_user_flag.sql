ALTER TABLE user_flag ADD CONSTRAINT uq_user_flag UNIQUE(user_id, flag_id);
