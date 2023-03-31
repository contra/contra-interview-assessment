--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Debian 15.2-1.pgdg110+1)
-- Dumped by pg_dump version 15.2 (Debian 15.2-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: FeatureFlag; Type: TABLE; Schema: public; Owner: contra_user
--

CREATE TABLE public."FeatureFlag" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255),
    value character varying(255),
    description text,
    "createdDate" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedDate" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."FeatureFlag" OWNER TO contra_user;

--
-- Name: User; Type: TABLE; Schema: public; Owner: contra_user
--

CREATE TABLE public."User" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255),
    email character varying(255),
    "createdDate" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedDate" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."User" OWNER TO contra_user;

--
-- Name: UserFeatureFlag; Type: TABLE; Schema: public; Owner: contra_user
--

CREATE TABLE public."UserFeatureFlag" (
    "userId" uuid NOT NULL,
    "featureFlagId" uuid NOT NULL,
    "specialValue" character varying(255),
    "createdDate" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedDate" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."UserFeatureFlag" OWNER TO contra_user;

--
-- Data for Name: FeatureFlag; Type: TABLE DATA; Schema: public; Owner: contra_user
--

COPY public."FeatureFlag" (id, name, value, description, "createdDate", "updatedDate") FROM stdin;
01ff166b-c14d-4c26-b431-1664eb67df63	Payment provider	Stripe	Stripe	2023-03-28 23:40:30.582969+00	2023-03-28 23:40:30.582969+00
2769277a-94af-463b-aa17-b626d623bcfa	Payment provider	Paypal	Paypal	2023-03-28 23:43:26.146226+00	2023-03-28 23:43:26.146226+00
cf02b3aa-aae6-4b76-85c9-b088344d6c9f	Discount	0.1	Discount for regular users	2023-03-28 23:43:26.146226+00	2023-03-28 23:43:26.146226+00
2a150b93-c331-4e5f-a008-74e8f5614776	Discount	0.4	Discount for new users	2023-03-28 23:42:22.953843+00	2023-03-28 23:42:22.953843+00
f09c1fb2-9599-406c-a486-29f08a5ac951	API Version	2	API Version 2	2023-03-28 23:43:26.146226+00	2023-03-28 23:43:26.146226+00
23646627-cb6b-42da-8074-4dd01dd7ae4d	API Version	3	API Version 3	2023-03-28 23:41:29.339368+00	2023-03-28 23:41:29.339368+00
4e12eac2-7c5f-473d-acaa-f35d34fb3bd2	Payment provider	Wise	Stripe	2023-03-30 20:11:38.057+00	2023-03-30 20:11:38.057+00
a568921d-b416-4899-9e75-8b466bcf0a49	Payment provider	MercadoPago	MercadoPago	2023-03-30 20:12:58.224+00	2023-03-30 20:12:58.224+00
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: contra_user
--

COPY public."User" (id, name, email, "createdDate", "updatedDate") FROM stdin;
4c28f8cb-0dfb-4047-b064-ad100f22a967	Jackson Richardson	kenya.marvin@gmail.com	2023-03-29 01:48:02.706634+00	2023-03-29 01:48:02.706634+00
0f42e43f-0566-45f2-9ce9-be3e10b62f9e	Kade Martin	wcruickshank@gmail.com	2023-03-29 01:48:02.706634+00	2023-03-29 01:48:02.706634+00
6f794354-f692-4f2c-b2c8-8245243b4f01	Sabrina Walker	cristian.windler@bernier.net	2023-03-29 01:48:02.706634+00	2023-03-29 01:48:02.706634+00
e6d32cda-7a21-4d09-af98-077a79631a5c	Bryce Phillips	krystel.kulas@hagenes.com	2023-03-29 01:48:02.706634+00	2023-03-29 01:48:02.706634+00
4d5b9f1a-b3ed-4cac-9203-18c0dbc55292	Kylie Douglas	hertha91@turcotte.com	2023-03-29 01:48:02.706634+00	2023-03-29 01:48:02.706634+00
e1be20ba-3e3f-4266-bff4-7bdbda3f4579	Rose Wright	lang.brianne@bashirian.com	2023-03-29 01:48:02.706634+00	2023-03-29 01:48:02.706634+00
\.


--
-- Data for Name: UserFeatureFlag; Type: TABLE DATA; Schema: public; Owner: contra_user
--

COPY public."UserFeatureFlag" ("userId", "featureFlagId", "specialValue", "createdDate", "updatedDate") FROM stdin;
4c28f8cb-0dfb-4047-b064-ad100f22a967	2769277a-94af-463b-aa17-b626d623bcfa	\N	2023-03-29 03:57:14.034+00	2023-03-29 03:57:14.034+00
0f42e43f-0566-45f2-9ce9-be3e10b62f9e	2769277a-94af-463b-aa17-b626d623bcfa	\N	2023-03-29 04:12:42.268+00	2023-03-29 04:12:42.268+00
bcd76b0b-5ccd-4f5a-8809-08f152aeb199	f09c1fb2-9599-406c-a486-29f08a5ac951	\N	2023-03-30 18:18:27.371+00	2023-03-30 18:18:27.371+00
6e187cc2-2ef1-467a-8540-7d27e2dc99ba	f09c1fb2-9599-406c-a486-29f08a5ac951	\N	2023-03-30 18:18:27.371+00	2023-03-30 18:18:27.371+00
e100952d-a853-460b-b192-0934b0452f63	f09c1fb2-9599-406c-a486-29f08a5ac951	\N	2023-03-30 18:18:27.371+00	2023-03-30 18:18:27.371+00
b9f46fae-81a3-4c1c-99a6-ce1ca996570a	f09c1fb2-9599-406c-a486-29f08a5ac951	\N	2023-03-30 18:18:27.371+00	2023-03-30 18:18:27.371+00
e012b2e7-e5e6-4bd6-ad24-54a88e7dbf17	f09c1fb2-9599-406c-a486-29f08a5ac951	\N	2023-03-30 18:18:27.371+00	2023-03-30 18:18:27.371+00
4c28f8cb-0dfb-4047-b064-ad100f22a967	cf02b3aa-aae6-4b76-85c9-b088344d6c9f	\N	2023-03-30 18:19:09.248+00	2023-03-30 18:19:09.248+00
0f42e43f-0566-45f2-9ce9-be3e10b62f9e	cf02b3aa-aae6-4b76-85c9-b088344d6c9f	\N	2023-03-30 18:19:09.248+00	2023-03-30 18:19:09.248+00
e100952d-a853-460b-b192-0934b0452f63	2a150b93-c331-4e5f-a008-74e8f5614776	\N	2023-03-30 18:19:09.248+00	2023-03-30 18:19:09.248+00
b9f46fae-81a3-4c1c-99a6-ce1ca996570a	2a150b93-c331-4e5f-a008-74e8f5614776	\N	2023-03-30 18:19:09.248+00	2023-03-30 18:19:09.248+00
e012b2e7-e5e6-4bd6-ad24-54a88e7dbf17	2a150b93-c331-4e5f-a008-74e8f5614776	\N	2023-03-30 18:19:09.248+00	2023-03-30 18:19:09.248+00
6e1827ce-e803-42b4-8fe4-4a53320f84d0	2a150b93-c331-4e5f-a008-74e8f5614776	\N	2023-03-30 18:19:09.248+00	2023-03-30 18:19:09.248+00
e100952d-a853-460b-b192-0934b0452f63	2769277a-94af-463b-aa17-b626d623bcfa	\N	2023-03-30 19:33:55.81+00	2023-03-30 19:33:55.81+00
b9f46fae-81a3-4c1c-99a6-ce1ca996570a	2769277a-94af-463b-aa17-b626d623bcfa	\N	2023-03-30 19:33:55.81+00	2023-03-30 19:33:55.81+00
e012b2e7-e5e6-4bd6-ad24-54a88e7dbf17	2769277a-94af-463b-aa17-b626d623bcfa	\N	2023-03-30 19:33:55.81+00	2023-03-30 19:33:55.81+00
6e1827ce-e803-42b4-8fe4-4a53320f84d0	2769277a-94af-463b-aa17-b626d623bcfa	\N	2023-03-30 19:33:55.81+00	2023-03-30 19:33:55.81+00
bcd76b0b-5ccd-4f5a-8809-08f152aeb199	4e12eac2-7c5f-473d-acaa-f35d34fb3bd2	\N	2023-03-30 20:12:49.742+00	2023-03-30 20:12:49.742+00
bcd76b0b-5ccd-4f5a-8809-08f152aeb199	a568921d-b416-4899-9e75-8b466bcf0a49	\N	2023-03-31 01:35:48.262+00	2023-03-31 01:35:48.262+00
\.


--
-- Name: FeatureFlag FeatureFlag_PKEY; Type: CONSTRAINT; Schema: public; Owner: contra_user
--

ALTER TABLE ONLY public."FeatureFlag"
    ADD CONSTRAINT "FeatureFlag_PKEY" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: contra_user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: UserFeatureFlag pk_user_flag; Type: CONSTRAINT; Schema: public; Owner: contra_user
--

ALTER TABLE ONLY public."UserFeatureFlag"
    ADD CONSTRAINT pk_user_flag PRIMARY KEY ("featureFlagId", "userId");


--
-- Name: UserFeatureFlag UserFeatureFlag_featureFlag_fkey; Type: FK CONSTRAINT; Schema: public; Owner: contra_user
--

ALTER TABLE ONLY public."UserFeatureFlag"
    ADD CONSTRAINT "UserFeatureFlag_featureFlag_fkey" FOREIGN KEY ("featureFlagId") REFERENCES public."FeatureFlag"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: UserFeatureFlag UserFeatureFlag_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: contra_user
--

ALTER TABLE ONLY public."UserFeatureFlag"
    ADD CONSTRAINT "UserFeatureFlag_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

