DROP DATABASE IF EXISTS employeeTrack_db;

CREATE DATABASE employeeTrack_db;

USE employeeTrack_db;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL 
);
CREATE TABLE roles(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL ,
    salary DECIMAL NOT NULL,
    departments_id INTEGER
);
CREATE TABLE employee(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INTEGER NOT NULL,
    manager_id INTEGER
);

USE employeeTrack_db;

INSERT INTO departments (name) VALUES ('Sales'), ('Engineering'),("Software Architect");

INSERT INTO roles (title, salary, departments_id) VALUES ("programmer", 120000, 2);
INSERT INTO roles (title, salary, departments_id) VALUES ("telecom", 12000, 1);
INSERT INTO roles (title, salary, departments_id) VALUES ("programming-architect", 100000, 3);

INSERT INTO employee (first_name, last_name, roles_id, manager_id ) VALUES ("Kenan","Ozbelli" ,1 , null);

