//imported packages
const inquirer = require('inquirer');
const fs = require("fs");

//team class constructors
const Employee = require('./Develop/lib/Employee');
const Engineer = require('./Develop/lib/Engineer');
const Intern = require('./Develop/lib/Intern');
const Manager = require('./Develop/lib/Manager');

//generates the html page with cards
const generateHtml = require('./Develop/util/generateHtml');

const team = [];

//gets managers info and then prompts for engineer and intern roles
init = () => {
    inquirer.prompt([
        {
            name: "name",
            message: "What is your Manager's name?",
            type: "text"
        },
        {
            name: "id",
            message: "What is their Empployee ID #?",
            type: "text"
        },
        {
            name: "email",
            message: "What is their email address?",
            type: "text"
        },
        {
            name: "officeNumber",
            message: "What is their Office #?",
            type: "text"
        }
    ]).then((data) => {
        const manager = new Manager(data.name, data.id, data.email, data.office);
        team.push(manager);
        console.log(manager);
        addRole();
    })
}; 

//allows user to pick role, input info based on the roles class, adds it to the team array and prompts the user to either add another role or to finish team and create the html
addRole = () => {
    inquirer.prompt([
        {
            name: "Role",
            type: "list",
            choices: ["Engineer", "Intern", "quit"]
        }
    ]).then((answers) => {
        switch (answers.Role) {
            case "Engineer":
                inquirer.prompt([
                    {
                        name: "name",
                        message: "What is their name?",
                        type: "text"
                    },
                    {
                        name: "id",
                        message: "What is their ID #?",
                        type: "text"
                    },
                    {
                        name: "email",
                        message: "What is your their address?",
                        type: "text"
                    },
                    {
                        name: "user",
                        message: "What is their Github username?"
                    }
                ]).then((data) => {
                    const engineer = new Engineer(data.name, data.id, data.email, data.user);
                    team.push(engineer)
                    addRole();
                })
                break;

            case "Intern":
                inquirer.prompt([
                    {
                        name: "name",
                        message: "What is their name?",
                        type: "text"
                    },
                    {
                        name: "id",
                        message: "What is their ID #?",
                        type: "text"
                    },
                    {
                        name: "email",
                        message: "What is their email address?",
                        type: "text"
                    },
                    {
                        name: "school",
                        message: "Where do they attend University?",
                        type: "text"
                    }
                ]).then((data) => {
                    const intern = new Intern(data.name, data.id, data.email, data.school);
                    team.push(intern)
                    console.log("Would you like to add an Engineer an Intern or quit?")
                    addRole();
                });
                    break;

                case "quit":
                    quit();

            };
    });
};

quit = () => { 
    fs.writeFile("index.html", generateHtml(team), (err) => {
        if(err){
            throw err;
        }
    });
};

//initiating function
init();