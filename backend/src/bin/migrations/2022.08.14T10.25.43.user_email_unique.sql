ALTER TABLE
    user_account
ADD
    CONSTRAINT user_email_unique UNIQUE (email_address);