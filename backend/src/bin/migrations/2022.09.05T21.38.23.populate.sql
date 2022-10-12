INSERT INTO public.user_account
(given_name, family_name, email_address)
VALUES('Rose', 'Alves', 'rose@gmail.com'),('Bruna', 'Santos', 'bruna@gmail.com'),('Julia', 'Dias', 'julia@gmail.com');

INSERT INTO public.feature_flag
(feature_flag_key)
VALUES('SHOULD_RENDER_LANDING_PAGE_NEXT_ACCESS'),('ALLOW_CREDIT_CARD_PAYMENT'),('SHOULD_NOT_RECEIVE_SPORSONSHIP_CONTENT');
