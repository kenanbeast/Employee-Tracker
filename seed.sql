USE employeeTrack_db;

INSERT INTO departments (name) VALUES ('Sales'), ('Engineering'),("Software Architect");

INSERT INTO roles (title, salary, departments_id), ('programmer', 120000, 2);
INSERT INTO roles (title, salary, departments_id), ('telecom', 12000, 1);
INSERT INTO roles (title, salary, departments_id), ('programming architect', 100000, 3);

INSERT INTO employee (first_name, last_name, roles_id, manager_id ) VALUES ("Kenan","Ozbelli" ,1 , null);