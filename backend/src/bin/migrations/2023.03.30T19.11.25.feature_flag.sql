CREATE TYPE feature_flag_type AS ENUM ('boolean', 'string', 'JSON');

CREATE TABLE feature_flag (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL UNIQUE,
    flag_type feature_flag_type NOT NULL,
    flag_enabled boolean NOT NULL,
    created_at timestamp with time zone DEFAULT NOW(),
    updated_at timestamp with time zone DEFAULT NOW()
);