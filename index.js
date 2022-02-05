const { init } = require('express/lib/application');
const inquirer = require('inquirer');


init();

function init() {
    console.log(`Program has started`);
    showOptions();
}

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