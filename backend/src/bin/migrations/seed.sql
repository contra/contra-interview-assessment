INSERT INTO
    feature_flag(flag_key)
VALUES
    ('k1'),
    ('k2'),
    ('k3'),
    ('k4');

INSERT INTO
    user_account(given_name, family_name, email_address)
VALUES
    ('g1', 'f1', 'e1'),
    ('g2', 'f2', 'e2'),
    ('g3', 'f3', 'e3'),
    ('g4', 'f4', 'e4'),
    ('g5', 'f5', 'e5'),
    ('g6', 'f6', 'e6');

INSERT INTO
    feature_flag_users(flag_id, user_id, flag_value)
VALUES
    (1, 1, 'v1'),
    (1, 2, 'v2'),
    (1, 3, 'v3'),
    (2, 2, 'v2'),
    (2, 3, 'v3');