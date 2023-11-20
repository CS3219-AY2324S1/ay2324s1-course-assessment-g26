CREATE TABLE IF NOT EXISTS clientuser (
    id    SERIAL PRIMARY KEY,
    name  VARCHAR(50)        NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    image VARCHAR(255)       NOT NULL
);

CREATE TABLE IF NOT EXISTS attempts (
    attempt_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(50),
    question_id VARCHAR(30),
    question_title VARCHAR(30),
    attempt_datetime TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    code VARCHAR(500)
);
