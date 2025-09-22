
CREATE DATABASE working_hours;
\c working_hours;

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

INSERT INTO role(name) VALUES ('Standard user');

CREATE TABLE app_user (
    id SERIAL PRIMARY KEY,
    email VARCHAR(234) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INT NOT NULL REFERENCES role(id)
);

CREATE TABLE day_status (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

INSERT INTO day_status(name)
VALUES ('Workday'), ('Weekend'), ('Holiday'), ('Overtime'), ('Time off'), ('Sick day');

CREATE TABLE day (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    status_id INT NOT NULL REFERENCES day_status(id)
);

CREATE TABLE day_log (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES app_user(id),
    day_id INT REFERENCES day(id),
    worked_hours INT DEFAULT 8,
    variation_status_id INT REFERENCES day_status(id),
    start TIME NOT NULL DEFAULT '09:00',
    stop TIME NOT NULL DEFAULT '18:00',
    notes VARCHAR(255)
);
