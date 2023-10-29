CREATE TABLE context(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    feature_flag_variant_id integer,
    environment text NOT NULL,
    context_enabled boolean NOT NULL,
    created_at timestamp with time zone DEFAULT NOW(),
    updated_at timestamp with time zone DEFAULT NOW(),
    UNIQUE(feature_flag_variant_id, environment),
    CONSTRAINT fk_feature_flag_variant
        FOREIGN KEY(feature_flag_variant_id)
            REFERENCES feature_flag_variant(id)
            ON DELETE CASCADE
);