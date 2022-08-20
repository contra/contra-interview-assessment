INSERT INTO user_account(given_name, family_name, email_address)
VALUES
    ('John', 'Carmack', 'johncarmack@seededemail123.com')
    ,('Abby', 'Gale', 'abbygale@seededemail123.com')
    ,('Finn', 'West', 'finnwest@seededemail123.com')
    ,('Brio', 'Fita', 'briofita@seededemail123.com')
;

INSERT INTO feature_flag(flag_key, flag_type, default_value)
VALUES
    ('seeded397_can_see_new_reports_panel',   'boolean',  'false')
    ,('seeded397_submit_button_color',        'string',   '"blue"')
    ,('seeded397_checkout_button_color',      'string',   null)
    ,('seeded397_num_displayed_rows',         'number',   '5')
    ,('seeded397_excluded_report_columns',    'array',    '[]')
    ,('seeded397_css_class_changes',          'object',   '{}')
;
