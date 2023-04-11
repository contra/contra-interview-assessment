-- Insert 5 users
INSERT INTO user_account (given_name, family_name, email_address)
VALUES
  ('John', 'Doe', 'john.doe@example.com'),
  ('Jane', 'Doe', 'jane.doe@example.com'),
  ('Bob', 'Smith', 'bob.smith@example.com'),
  ('Alice', 'Johnson', 'alice.johnson@example.com'),
  ('David', 'Brown', 'david.brown@example.com');

-- Insert 3 features
INSERT INTO feature (feature_name)
VALUES
  ('Feature A'),
  ('Feature B'),
  ('Feature C');

-- Insert user feature flags
INSERT INTO user_feature_flag (feature_id, user_id, flag)
VALUES
  (1, 1, '{"enabled": true}'),
  (1, 2, '{"enabled": false}'),
  (2, 3, '{"enabled": true, "settings": {"color": "blue"}}'),
  (3, 4, '{"enabled": false, "settings": {"color": "green"}}'),
  (3, 5, '{"enabled": true, "settings": {"color": "red", "size": "large"}}');
