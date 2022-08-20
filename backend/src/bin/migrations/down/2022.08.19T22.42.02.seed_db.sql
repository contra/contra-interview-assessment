DELETE FROM user_account
WHERE
    email_address IN (
        'johncarmack@seededemail123.com'
        ,'abbygale@seededemail123.com'
        ,'finnwest@seededemail123.com'
        ,'briofita@seededemail123.com'
    )
;

DELETE FROM feature_flag
WHERE
    flag_key IN (
        'seeded397_can_see_new_reports_panel'
        ,'seeded397_submit_button_color'
        ,'seeded397_checkout_button_color'
        ,'seeded397_num_displayed_rows'
        ,'seeded397_excluded_report_columns'
        ,'seeded397_css_class_changes'
    )
;