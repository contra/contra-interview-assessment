CREATE TABLE user_feature ( 
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  featureId INTEGER NOT NULL
	  REFERENCES feature_flag(id),
  userId INTEGER NOT NULL
	  REFERENCES user_account(id),
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone DEFAULT NOW()
);