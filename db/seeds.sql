INSERT INTO department (name)
VALUES
('Sales'),
('Engineering'),
('Legal'),
('Finance');

INSERT INTO roles (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Sales Person',80000,1),
('Lead Engineer',150000,2),
('Software Engineer',120000,2),
('Accountant', 125000, 4),
('Legal Team Lead',250000,3),
('Lawyer',190000,3);



INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES
  ('Ronald', 'Firbank', NULL, 3),
  ('Virginia', 'Woolf', NULL, 6),
  ('Piers', 'Gaveston', NULL, 5),
  ('Charles', 'LeRoi', 1, 1),
  ('Katherine', 'Mansfield', 4, 2),
  ('Dora', 'Carrington', 1, 4),
  ('Edward', 'Bellamy', 2, 7),
  ('Montague', 'Summers', 1, 4);
