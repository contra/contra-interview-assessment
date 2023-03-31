CREATE TABLE feature_flag_variant (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    feature_flag_id integer NOT NULL,
    flag_value text NOT NULL,
    created_at timestamp with time zone DEFAULT NOW(),
    updated_at timestamp with time zone DEFAULT NOW(),
    UNIQUE(feature_flag_id, flag_value),
    CONSTRAINT fk_feature_flag
        FOREIGN KEY(feature_flag_id)
            REFERENCES feature_flag(id)
            ON DELETE CASCADE
);

