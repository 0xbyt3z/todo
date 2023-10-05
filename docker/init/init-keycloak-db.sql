	CREATE USER keycloak PASSWORD 'keycloak_password';
	CREATE DATABASE keycloak;
	GRANT ALL PRIVILEGES ON DATABASE keycloak TO keycloak;
	\c keycloak
	GRANT ALL ON SCHEMA public TO keycloak;