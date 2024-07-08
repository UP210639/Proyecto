CREATE DATABASE IF NOT EXISTS task_management;
use task_management


CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE projects (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


CREATE TABLE projects (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


CREATE TABLE tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    project_id INT,
    user_id INT,
    FOREIGN KEY (project_id) REFERENCES projects(project_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Insert users
INSERT INTO users (first_name, last_name, email, password, is_admin) VALUES 
('John', 'Doe', 'john.doe@example.com', 'password1', TRUE),
('Jane', 'Smith', 'jane.smith@example.com', 'password2', FALSE);

-- Insert projects
INSERT INTO projects (name, description, user_id) VALUES 
('Project A', 'Description of Project A', 1),
('Project B', 'Description of Project B', 2);

-- Insert tasks
INSERT INTO tasks (name, description, status, project_id, user_id) VALUES 
('Task 1', 'Description of Task 1', 'pending', 1, 2),
('Task 2', 'Description of Task 2', 'in_progress', 2, 1);

