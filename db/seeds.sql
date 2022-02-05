USE employee;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Johannes', 'Gutenberg', 5, NULL),
    ('Napoleon','Bonaparte', 4, NULL),
    ('Martin','Luther', 3, NULL),
    ('Karl','Marx', 3, NULL),
    ('Julius','Caesar', 3, NULL),
    ('Gautama','Buddha', 2, NULL),
    ('Nikola','Tesla', 1, NULL),
    ('George','Washington', 2, NULL),
    ('Abraham','Lincoln', 5, NULL),
    ('Mahatma','Gandhi', 2, NULL),
    ('Martin','King', 2, NULL),
    ('William','Shakespeare', 5, NULL),
    ('Charles','Darwin', 1, NULL),
    ('Alexander','Great', 5, NULL),
    ('Galileo','Galilei', 4, NULL);


INSERT INTO department
VALUES 
    ('Information Technology'),
    ('Human Resource'),
    ('Operations Management'),
    ('Finance'),
    ('Marketing');

INSERT INTO role (title, salary, dept_id)
VALUES 
    ('Team Lead', 110000, 1),
    ('Accountant', 85000, 4),
    ('Developer', 90000, 1),
    ('Operations Coordinator', 50000, 3),
    ('Operations Analyst', 67000, 3),
    ('Project Manager', 87000, 3),
    ('QA Engineer', 65000, 1),
    ('Talent Manager', 70000, 2),
    ('HR Compliance', 80000, 2),
    ('Payroll', 82000, 4),
    ('Chief Marketing Officer', 99000, 5),
    ('Creative Director', 78000, 5),
    ('Communications Manager', 66000, 5);
