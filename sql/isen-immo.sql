--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: announcement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE announcement (
    aid integer NOT NULL,
    mail character varying(64) NOT NULL,
    title character varying(64) NOT NULL,
    description character varying(1024) NOT NULL,
    image character varying(256) NOT NULL,
    address character varying(256) NOT NULL,
    createdat date NOT NULL,
    updatedat date NOT NULL
);


ALTER TABLE announcement OWNER TO postgres;

--
-- Name: announcement_aid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE announcement_aid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE announcement_aid_seq OWNER TO postgres;

--
-- Name: announcement_aid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE announcement_aid_seq OWNED BY announcement.aid;


--
-- Name: group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "group" (
    gid integer NOT NULL,
    createdat date NOT NULL,
    updatedat date NOT NULL
);


ALTER TABLE "group" OWNER TO postgres;

--
-- Name: group_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE group_gid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE group_gid_seq OWNER TO postgres;

--
-- Name: group_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE group_gid_seq OWNED BY "group".gid;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "user" (
    mail character varying(64) NOT NULL,
    firstname character varying(32) NOT NULL,
    lastname character varying(32) NOT NULL,
    phone character varying(32) NOT NULL,
    salt character varying(512) NOT NULL,
    hash character varying(512) NOT NULL,
    createdat date NOT NULL,
    updatedat date NOT NULL
);


ALTER TABLE "user" OWNER TO postgres;

--
-- Name: user_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE user_group (
    mail character varying(64) NOT NULL,
    gid integer NOT NULL,
    createdat date NOT NULL,
    updatedat date NOT NULL
);


ALTER TABLE user_group OWNER TO postgres;

--
-- Name: announcement aid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY announcement ALTER COLUMN aid SET DEFAULT nextval('announcement_aid_seq'::regclass);


--
-- Name: group gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "group" ALTER COLUMN gid SET DEFAULT nextval('group_gid_seq'::regclass);


--
-- Data for Name: announcement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY announcement (aid, mail, title, description, image, address, createdat, updatedat) FROM stdin;
1	duboiflorentin@gmail.com	Appartement Athéna	L'appartement de panda	http://referentiel.nouvelobs.com/file/13728716-des-pandas-roux-dans-la-neige-font-fondre-le-web.jpg	3 rue des roux	2017-01-22	2017-01-22
2	duboiflorentin@gmail.com	Appartement Parthénon	L'appartement de miton	http://www.zoo-palmyre.fr/sites/default/files/_mg_8751.jpg	4 rue des collignons	2017-01-22	2017-01-22
\.


--
-- Name: announcement_aid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('announcement_aid_seq', 2, true);


--
-- Data for Name: group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "group" (gid, createdat, updatedat) FROM stdin;
1	2017-01-22	2017-01-22
2	2017-01-22	2017-01-22
\.


--
-- Name: group_gid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('group_gid_seq', 1, false);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "user" (mail, firstname, lastname, phone, salt, hash, createdat, updatedat) FROM stdin;
duboiflorentin@gmail.com	tot	dubois	+33658374383	$2a$04$1kmJHf1i8nvfKibCuGrLme	$2a$04$1kmJHf1i8nvfKibCuGrLmeB9JzPE1kwDWeXSkJCL6Jc6O/ILZuWHO	2017-01-22	2017-01-22
\.


--
-- Data for Name: user_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_group (mail, gid, createdat, updatedat) FROM stdin;
duboiflorentin@gmail.com	1	2017-01-22	2017-01-22
\.


--
-- Name: announcement announcement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY announcement
    ADD CONSTRAINT announcement_pkey PRIMARY KEY (aid);


--
-- Name: group group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "group"
    ADD CONSTRAINT group_pkey PRIMARY KEY (gid);


--
-- Name: user_group user_group_mail_gid_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_group
    ADD CONSTRAINT user_group_mail_gid_pk PRIMARY KEY (mail, gid);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (mail);


--
-- Name: announcement announcement_user_mail_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY announcement
    ADD CONSTRAINT announcement_user_mail_fk FOREIGN KEY (mail) REFERENCES "user"(mail);


--
-- Name: user_group user_group_group_gid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_group
    ADD CONSTRAINT user_group_group_gid_fk FOREIGN KEY (gid) REFERENCES "group"(gid);


--
-- Name: user_group user_group_user_mail_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_group
    ADD CONSTRAINT user_group_user_mail_fk FOREIGN KEY (mail) REFERENCES "user"(mail);


--
-- PostgreSQL database dump complete
--

