INSERT INTO feature_flag_variant (feature_flag_id, flag_value)
VALUES
    (1, 'true'),
    (1, 'false'),
    (2, 'true'),
    (2, 'false'),
    (3, 'red'),
    (3, 'orange'),
    (3, 'green'),
    (4, '{ a: true, b: true }'),
    (4, '{ a: true, b: false }'),
    (4, '{ a: false, b: true }'),
    (4, '{ a: false, b: false }')