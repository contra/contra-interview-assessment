CREATE TABLE user_account (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  givenname text NOT NULL,
  familyname text NOT NULL,
  emailaddress text NOT NULL,
  createdat timestamp with time zone DEFAULT NOW(),
  updatedat timestamp with time zone DEFAULT NOW()
);

CREATE TABLE feature_flag (
  featureflagid bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL
);

CREATE TABLE user_feature_flag (
  userid bigint,
  featureflagid bigint,
  value text NOT NULL,
  PRIMARY KEY(user_id, featureflagid)
);
