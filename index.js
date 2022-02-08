const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./db/connection');

// later on when I have more time I want to make the Roles, Depts, ect mapped out in inquirer.


// Initializing the Program
startProgram();

// when Program begins,show the list of options that can be made. 
function startProgram() {
    showOptions();
}

// ---------------------------------  PROMPTS  ---------------------------

// Main prompt for viewing, creating and modifying employees, departments, and roles
function showOptions() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "firstchoice",
                message: "Would you like to: ",
                choices: ["View All Employees", "View All departments", "View All roles",
                 "Add a New Employee", "Add a New Department", "Add a New Role", "Update an Employee"]
            }
        ])
        .then((response) => {
            // const choice = response.firstchoice.replace(/\r?\n|\r/g, " ");
            checkOption(response.firstchoice);
        })
}



function updateOptions(employee_id) {
    inquirer.prompt([

        {
            type: "list",
            name: "update_choice",
            message: "Would aspect of the employee would you like to update: ",
            choices: ["First Name", "Last Name", "Role",
             "Manager"]
        }
    ])
    .then((response) => {
        checkUpdate(response.update_choice, employee_id);
    })
}

// --------------------------  CHECKING EMPLOYEE ID  ---------------------------------

function getEmployeeId() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "employee_id",
            message: "Please input an employee id: ",
            validate: (answer)=> {
                if(!answer || answer === '' ){
                    console.log(`Employee ID cannot be blank.`);
                    return false;
                }
                if(isNaN(answer)) {
                    console.log(`Employee ID must be a number.`)
                    return false;
                }
                answer = Number(answer);
                if(answer <=0) {
                    console.log(`Employee ID must be larger than 0`);
                    return false;
                }

                return true;
            }
        }
    ])
    .then((response) => {
        console.log(`------- Checking if Employee Exists -------`);
        
        const employee_id = Number(response.employee_id)
        const sqlQuery = `SELECT * FROM employee WHERE id=${employee_id}`; 

       
        connection.query(sqlQuery, (err, response) => {
            if (err) {
                console.log(`Sorry, this employee does not seem to exist. Please try again.`);
                return false;
            };
            console.log(response);
        })
    
        setTimeout(() => {updateOptions(employee_id);}, 500);
    })
}

// --------------------------  Switches  ---------------------------------


// When an option has been chosen, go to the corresponding function
function checkOption(initialOption) {
    
    switch(initialOption) {
        case 'View All Employees':
            viewEmployee();
            break;
        case 'View All departments':
            viewDepartment();
            break;
        case 'View All roles':
            viewRole();
            break;
        case 'Add a New Employee':
            addEmployee();
            break;
        case 'Add a New Department':
            addDepartment();
            break;
        case 'Add a New Role':
            addRole();
            break;
        case 'Update an Employee':
            getEmployeeId(); 
            break;
    }
}


function checkUpdate(updateChoice, employee_id){
    
    switch(updateChoice) {
        case 'First Name':
            updateFirstName(employee_id);
            break;
        case 'Last Name':
            updateLastName(employee_id);
            break;
        case 'Role':
            updateRole(employee_id);
            break;
        case 'Manager': 
            updateManager(employee_id);
            break;
    }
}


// -----------------------  VIEWS  ---------------------------------------


// View all employees in the database
const viewEmployee = () => {
    console.log(`------- Viewing All Employees -------`);
    
    const sqlQuery = `SELECT employee.id, employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title, department.dept_name AS "Department", role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS "Manager"  
    FROM employee 
    JOIN role ON employee.role_id = role.id 
    JOIN department ON role.dept_id = department.id 
    LEFT JOIN employee manager ON employee.manager_id = manager.id 
    ORDER BY employee.id`;
    
    connection.query(sqlQuery, (err, response) => {
        if (err) throw err;
        console.table(response);
    })

    setTimeout(() => {showOptions();}, 500);
};

// View all departments in the database
const viewDepartment = () => {
    console.log(`------- Viewing All Departments -------`);

    const sqlQuery = `SELECT * FROM department`;
    
    connection.query(sqlQuery, (err, response) => {
        if (err) throw err;
        console.table(response);
    })

    setTimeout(() => {showOptions();}, 500);
}

// View all roles in the database
const viewRole = () => {
    console.log(`------- Viewing All Roles -------`);

    const sqlQuery = `SELECT * FROM role`;
    
    connection.query(sqlQuery, (err, response) => {
        if (err) throw err;
        console.table(response);
    })

    setTimeout(() => {showOptions();}, 500);
}


// ---------------------------- ADDS --------------------------------


// Create a new employee, must have first name, last name and role id. Manager id is optional.
const addEmployee = () => {
    console.log(`------- Creating A New Employee -------`); 

    inquirer
    .prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employees first name?",
            validate:(answer) => {
                if (!answer || answer === '') {
                    console.log(`Employee must have a first name!`);
                    return false;
                };

                return true;
            }
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employees last name?",
            validate:(answer) => {
                if (!answer || answer === '') {
                    console.log(`Employee must have a last name!`);
                    return false;
                };

                return true;
            }
        },
        {
            type: "input",
            name: "role_id",
            message: "What is their role ID?",
            validate:(answer) => {
                if (!answer || answer === '') {
                    console.log(`Must enter a role ID!`);
                    return false;
                };

                answer = Number(answer);

                if (isNaN(answer)) {
                    console.log(`Role ID must be a number.`);
                    return false;
                }
                return true;
            }
        },
        {
            type: "input",
            name: "manager_id",
            message: "What is manager ID for this employee?"
        }

    ])
    .then(response => {
        const fName = response.first_name.trim();
        const lName = response.last_name.trim();
        response.role_id = Number(response.role_id);
 
        // Somehow I can give an invalid role_id and it will create the employee anyways. 
        if(!response.manager_id || response.manager_id === '') {
            const sqlQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${fName}', '${lName}', ${response.role_id}, NULL)`;
        
            connection.query(sqlQuery, (err, results) => {
                if (err) {
                    console.log(`Role ID was not valid. Please try again with a different Role ID for ${fName} ${lName}.`);
                    showOptions();
                };

                console.log(`Employee has been created!`);
            })
        }

        if(response.manager_id) {
            const sqlQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${fName}', '${lName}', ${response.role_id}, ${response.manager_id})`;
        
            connection.query(sqlQuery, (err, results) => {
                if (err) throw err;
                console.log(`Employee has been created!`);
            })
        }
        
        setTimeout(() => {showOptions();}, 500);
    })
}

// Create a department by providing a name
const addDepartment = () => {
    console.log(`------- Creating A New Department -------`);

    // Do I want to add validation that will check if the name is unique?

    inquirer
    .prompt([
        {
            type: "input",
            name: "dept_name",
            message: "What is the name of the new Department? ",
            validate:(answer) => {
                if (!answer || answer === '') {
                    console.log(`Please enter a Department name!`);
                    return false;
                };

                return true;
            }
        }
    ])
    .then((response) => {

        response.dept_name = response.dept_name.trim();
        const sqlQuery = `INSERT INTO department (dept_name) VALUES ('${response.dept_name}')`;

        connection.query(sqlQuery, (err, results) => {
            if (err) throw err;
            console.log(`Department has been made!`);
        })

        setTimeout(() => {showOptions();}, 500);
    })  
}

const addRole = () => {
    console.log(`------- Creating A New Role -------`);

    // Changed the type for the salary and dept_id to input 
    // because I kept being presented with the failed answer when returning to the question and unplanned behavior occurred

    inquirer
    .prompt([
        {
            type: "input",
            name: "dept_name",
            message: "What is the name of the new Role? ",
            validate:(answer) => {
                if (!answer || answer === '') {
                    console.log(`Please enter a Role name!`);
                    return false;
                };

                return true;
            }
        },
        {
            type: "input",
            name: "salary",
            message: "How much will this role be making per year? ",
            validate:(answer) => {
                if (!answer || answer === '') {
                    console.log(`Please enter a salary for this role!`);
                    return false;
                };

                answer = Number(answer);

                if(answer <= 0) {
                    console.log(`Salary must be greater than 0`);
                    return false;
                };

                return true;
            }
        },
        {
            type: "input",
            name: "dept_id",
            message: "What department is this role in? ",
            validate:(answer) => {
                if (!answer || answer === '') {
                    console.log(`Please enter a department number!`);
                    return false;
                };

                answer = Number(answer);

                if (answer <= 0) {
                    console.log(`Department number must be greater than 0!`);
                    return false;
                };

                return true;
            }
        }
    ])
    .then((response) => {
        const sqlQuery = `INSERT INTO role (title, salary, dept_id) VALUES ('${response.dept_name}', ${response.salary}, ${response.dept_id})`;

        connection.query(sqlQuery, (err, results) => {
            if (err) {

                // this was easier to convey an incorrect id here than if done in validation steps. 
                console.log(`The department ID provided does not exist. Please try again.`);
                return false;
            }

            console.log(`Role has been created successfully!`);
        })
        
        setTimeout(() => {showOptions();}, 600);
    }) 
}

// ---------------------------- UPDATES --------------------------------


const updateFirstName = (employee_id) => {
    inquirer
    .prompt([
        {
            type: "input",
            name: "newfirstname",
            message: "What is the employees first name?",
            validate:(answer) => {
                if (!answer || answer === '') {
                    console.log(`Employee must have a first name!`);
                    return false;
                };

                return true;
            }
        }
    ])
    .then((response) => {
        console.log(response);
        console.log(employee_id);

        const sqlQuery = `UPDATE employee SET first_name='${response.newfirstname}' WHERE id=${employee_id}`;

        connection.query(sqlQuery, (err, results) => {
            if (err) throw err;
            console.log(`Employee's first name has been changed!`);
        })

        setTimeout(() => {showOptions();}, 500);
    })
}

const updateLastName = (employee_id) => {
    inquirer
    .prompt([
        {
            type: "input",
            name: "newlastname",
            message: "What is the employees last name?",
            validate:(answer) => {
                if (!answer || answer === '') {
                    console.log(`Employee must have a last name!`);
                    return false;
                };

                return true;
            }
        }
    ])
    .then((response) => {
        const sqlQuery = `UPDATE employee SET last_name='${response.newlastname}' WHERE id=${employee_id}`;

        connection.query(sqlQuery, (err, results) => {
            if (err) throw err;
            console.log(`Employee's last name has been changed!`);
        })

        setTimeout(() => {showOptions();}, 500);
    })

}

const updateRole = (employee_id) => {
    inquirer
    .prompt([
        {
            type: "input",
            name: "newrole",
            message: "What is their role ID?",
            validate:(answer) => {
                if (!answer || answer === '') {
                    console.log(`Must enter a role ID!`);
                    return false;
                };

                answer = Number(answer);

                if (isNaN(answer)) {
                    console.log(`Role ID must be a number.`);
                    return false;
                }
                return true;
            }
        }
    ])
    .then((response) => {
        const sqlQuery = `UPDATE employee SET role_id='${response.newrole}' WHERE id=${employee_id}`;

        connection.query(sqlQuery, (err, results) => {
            if (err) throw err;
            console.log(`Employee's role has been changed!`);
        })

        setTimeout(() => {showOptions();}, 500);
    })
}

const updateManager = (employee_id) => {
    inquirer
    .prompt([
        {
            type: "input",
            name: "newmanager",
            message: "What is manager ID for this employee?"
        }
    ])
    .then((response) => {
        const sqlQuery = `UPDATE employee SET manager_id='${response.newmanager}' WHERE id=${employee_id}`;

        connection.query(sqlQuery, (err, results) => {
            if (err) throw err;
            console.log(`Employee's manager has been changed!`);
        })

        setTimeout(() => {showOptions();}, 500);
    })
}

