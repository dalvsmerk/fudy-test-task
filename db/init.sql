CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email varchar(320) NOT NULL UNIQUE,
    password varchar(255) NOT NULL
);
