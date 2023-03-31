CREATE TABLE user_context (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer,
    context_id integer,
    created_at timestamp with time zone DEFAULT NOW(),
    updated_at timestamp with time zone DEFAULT NOW(),
    UNIQUE(user_id, context_id),
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES user_account(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_context
        FOREIGN KEY(context_id)
            REFERENCES context(id)
            ON DELETE CASCADE
);