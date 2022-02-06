const inquirer = require('inquirer');
const mysql = require('mysql2');
const connection = require('./db/connection');
// const database = require('./db');


startProgram();

function startProgram() {
    // console.log(`Program has started`);
    showOptions();
}

// ---------------------------------  PROMPTS  ---------------------------
// Do I want to turn this initial option menu into an Expand? Look into it.
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

// --------------------------  Switches  ---------------------------------


function checkOption(initialOption) {
    console.log(`in check option function`);
    console.log(initialOption);
    // viewEmployee();
    
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
        // case 'Add a New Employee':
        //     addEmployee();
        //     break;
        case 'Add a New Department':
            addDepartment();
            break;
        case 'Add a New Role':
            addRole();
            break;
        // case 'View All Employees':
        //     viewOptions();
        //     break;
        // case 'Update an Employee':
        //     updateEmployee();
        //     break;
        // case 'Update':
        //     updateOptions();
        //     break;
    }
}

// -----------------------  VIEWS  ---------------------------------------

const viewEmployee = () => {
    console.log(`ViewAllEmployees-------------------------------`);
    
    const sqlQuery = `SELECT * FROM employee`;
    
    connection.query(sqlQuery, (err, response) => {
        if (err) {
            throw err};
   
        console.log(response);    
    })
    setTimeout(() => {showOptions();}, 500);
};

const viewDepartment = () => {
    console.log(`ViewAllDepartments-----------------------------`);
    const sqlQuery = `SELECT * FROM department`;
    
    connection.query(sqlQuery, (err, reponse) => {
        if (err) throw err;
        console.log(reponse);
        
    })
    setTimeout(() => {showOptions();}, 500);
}

const viewRole = () => {
    console.log(`ViewAllRoles-----------------------------`);
    const sqlQuery = `SELECT * FROM role`;
    
    connection.query(sqlQuery, (err, results) => {
        if (err) throw err;
        console.log(results);
      
    })
    setTimeout(() => {showOptions();}, 500);
}

// ---------------------------- ADDS --------------------------------


// const addEmployee = () => {
//     console.log(`addEmployee----------------------------`);
//     inquirer
//     .prompt([
//         {
//             type: "input",
//             name: "first_name",
//             message: "What is the employees first name?",
//             validate:(answer) => {
//                 if (!answer) {
//                     console.log(`Must enter a first name!`);
//                     return false;
//                 };
//                 return true;
//             }
//         },
//         {
//             type: "input",
//             name: "last_name",
//             message: "What is the employees last name?",
//             valididate:(answer) => {
//                 if (!answer) {
//                     console.log(`Must enter a last name!`);
//                     return false;
//                 };
//                 return true;
//             }
//         },
//         {
//             type: "input",
//             name: "role_id",
//             message: "What is their role?",
//             valididate:(answer) => {
//                 // must check if there is something in the role, must also check if the role is valid

//                 if (!answer || answer === '') {
//                     console.log(`Must enter a role!`);
//                     return false;
//                 };
//                 if (answer && answer !== '') {
//                     // check if role is valid. 
//                 }
//                 return true;
//             }
//         },

//     ])
//     .then(response => {
//         console.log(response);
//         // make if statement here to check if there is a manager id 

//         const sqlQuery = `INSERT INTO employee `

//     })
// }

const addDepartment = () => {
    console.log(`addDepartment----------------------------`);
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
        console.log(response.dept_name);
        const sqlQuery = `INSERT INTO department (name) VALUES ('${response.dept_name}')`;
        console.log(sqlQuery);

        connection.query(sqlQuery, (err, results) => {
            if (err) throw err;
            console.log(results);
        })

        setTimeout(() => {showOptions();}, 500);

    })  
}

const addRole = () => {
    console.log(`addRole----------------------------`);
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
            type: "number",
            name: "salary",
            message: "How much will this role be making per year? ",
            validate:(answer) => {
                if (!answer || answer === '') {
                    console.log(`Please enter a salary for this role!`);
                    return false;
                };
                if(answer <= 0) {
                    console.log(`Salary must be greater than 0`);
                    return false;
                };
                return true;
            }
        },
        {
            type: "number",
            name: "dept_id",
            message: "What department is this role in? ",
            validate:(answer) => {
                if (!answer || answer === '') {
                    console.log(`Please enter a department number!`);
                    return false;
                };
                if (answer <= 0){
                    console.log(`Department number must be greater than 0!`);
                    return false;
                }
                // if (answer > 0) {
                //     // must validate that this number is correct/ it exists
                // }
                return true;
            }
        }
    ])
    .then((response) => {
        console.log(response.dept_name);
        const sqlQuery = `INSERT INTO role (title, salary, dept_id) VALUES ('${response.dept_name}', ${response.salary}, ${response.dept_id})`;
        console.log(sqlQuery);

        connection.query(sqlQuery, (err, results) => {
            if (err) throw err;
            console.log(results);
        })

        setTimeout(() => {showOptions();}, 500);

    }) 
}