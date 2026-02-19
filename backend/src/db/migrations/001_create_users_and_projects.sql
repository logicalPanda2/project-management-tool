BEGIN;

CREATE TYPE project_task_status AS ENUM (
    'COMPLETE',
    'INCOMPLETE'
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status project_task_status DEFAULT 'INCOMPLETE',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_projects (
    user_id INTEGER NOT NULL,
    project_id INTEGER NOT NULL,
    user_role VARCHAR(100) NOT NULL,

    PRIMARY KEY (user_id, project_id),

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status project_task_status DEFAULT 'INCOMPLETE',
    project_id INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),

    FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE
);

COMMIT;
