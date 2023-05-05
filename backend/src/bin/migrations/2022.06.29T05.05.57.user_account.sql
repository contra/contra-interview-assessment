CREATE TABLE user_account (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  givenNme text NOT NULL,
  familyName text NOT NULL,
  emailAddress text NOT NULL,
  createdAt timestamp with time zone DEFAULT NOW(),
  updatedAt timestamp with time zone DEFAULT NOW()
);

