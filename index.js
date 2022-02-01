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
                name: "decide",
                message: "Would you like to: ",
                choices: ["View", "Add", "Update"]
            }
        ])
        .then((response) => {
            console.log(response);
            checkOption(response);
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

function viewOptions() {

}

function addOptions(){

}

function updateOptions(){
    
}