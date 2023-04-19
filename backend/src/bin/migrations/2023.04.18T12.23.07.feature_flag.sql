CREATE TABLE feature_flag (
 id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 feature_name text NOT NULL,
 status JSON,
 created_at timestamp with time zone DEFAULT NOW(),
 updated_at timestamp with time zone DEFAULT NOW()
);