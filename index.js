const { init } = require('express/lib/application');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const database = require('./db');


init();

function init() {
    console.log(`Program has started`);
    showOptions();
}

// ---------------------------------  PROMPTS  ---------------------------
// Do I want to turn this initial option menu into an Expand? Look into it.
function showOptions() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "choice",
                message: "Would you like to: ",
                choices: ["View", "Add", "Update"]
            }
        ])
        .then((response1) => {
            console.log(response1);
            checkOption(response1);
        })
}

function viewOptions() {
    inquirer
        .prompt([
            {
                type:"list",
                name: "viewchoice",
                message: "What would you like to view?",
                choices: ["Employee", "Role", "Department", "Go Back"]
            }
        ])
        .then((response2) => {
            console.log(response2);
            checkView(response2);
        })
}

function addOptions(){
    inquirer
        .prompt([
            {
                type:"list",
                name: "addchoice",
                message: "What would you like to add?",
                choices: ["Employee", "Role", "Department", "Go Back"]
            }
        ])
        .then((response3) => {
            console.log(response3);
            checkAdd(response3);
        })
}

function updateOptions(){
    inquirer
        .prompt([
            {
                type:"list",
                name: "updatechoice",
                message: "What would you like to update?",
                choices: ["Employee", "Role", "Department", "Go Back"]
            }
        ])
        .then((response4) => {
            console.log(response4);
            checkUpdate(response4);
        })
}

// --------------------------  Switches  ---------------------------------


function checkOption(initialOption) {
    switch(initialOption) {
        case 'View':
            viewOptions();
        case 'Add':
            addOptions();
        case 'Update':
            updateOptions();
    }
}

function checkView(viewOption) {
    switch(viewOption) {
        case 'Employee':
            viewEmployee();
        case 'Role':
            viewRole();
        case 'Department':
            viewDepartment();
        case 'Go Back':
            showOptions();
    }
}

function checkAdd(addOption) {
    switch(addOption) {
        case 'Employee':
            createEmployee();
        case 'Role':
            createRole();
        case 'Department':
            createDepartment();
        case 'Go Back':
            showOptions();
    }
}

function checkUpdate(updateOption) {
    switch(updateOption) {
        case 'Employee':
            updateEmployee();
        case 'Role':
            updateRole();
        case 'Department':
            updateDepartment();
        case 'Go Back':
            showOptions();
    }
}

// -----------------------  VIEWS  ---------------------------------------

const viewEmployee = () => {
    console.log(`ViewAllEmployees-------------------------------`);
    const sqlQuery = `SELECT * FROM employee`;
    
    connection.promise().query(sqlQuery, (err, results) => {
        if (err) throw err;
        console.log(results);
        viewOptions();
    })
}

const viewDepartment = () => {
    console.log(`ViewAllDepartments-----------------------------`);
    const sqlQuery = `SELECT * FROM department`;
    
    connection.promise().query(sqlQuery, (err, results) => {
        if (err) throw err;
        console.log(results);
        viewOptions();
    })
}

const viewRole = () => {
    console.log(`ViewAllRoles-----------------------------`);
    const sqlQuery = `SELECT * FROM role`;
    
    connection.promise().query(sqlQuery, (err, results) => {
        if (err) throw err;
        console.log(results);
        viewOptions() 
    })
}

// ---------------------------- ADDS --------------------------------


// const addEmployee = () => {
//     console.log(`addEmployee----------------------------`);
//     inquirer
//     prompt([
//         {
//             type: "input",
//             name: "first_name",
//             message: "What is the employees first name?"
//         },
//         {
//             type: "input",
//             name: "last_name",
//             message: "What is the employees last name?"
//         }
//     ])
//     .then(response => {
//         let firstName = response.first_name;
//         let lastName = response.last_name;

//         database.showAllRoles()
//         .then(([roles]) => {
//             const roleOptions = roles.map(({id, title}) => ({
//                 name: title;
//                 value:id
//             }))
//         })
//     })
// }

// const addDepartment = () => {
//     console.log(`addDepartment----------------------------`);
//     inquirer
//     prompt([
//         {
            
//         }
//     ])
// }

// const addRole = () => {
//     console.log(`addRole----------------------------`);
//     inquirer
//     prompt([
//         {
            
//         }
//     ])
// }