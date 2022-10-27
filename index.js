//team class constructors
const Engineer = require('./Develop/lib/Engineer');
const Intern = require('./Develop/lib/Intern');
const Manager = require('./Develop/lib/Manager');

//imported packages
const inquirer = require("inquirer");
const fs = require("fs");

//imports generateHtml
const generateHtml = require("./Develop/util/generateHtml");

//team members array
const team = [];

//initial function, adds Manager and asks for their info, adds team member to the team array
addManager = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the Manager's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the Manager's ID number?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the Manager's email?",
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the Manager's office number?",
        }
    ]).then((ans) => {
        const manager = new Manager (ans.name, ans.id, ans.email, ans.officeNumber);
        team.push(manager);
        addEmployee();
    })
};

//prompts user to add another engineer, intern or quit
addEmployee = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Would you like to add an Engineer, add an Intern, or Quit?",
            choices: ["add an Engineer", "add an Intern", "Quit"]
        }
    ]).then((ans)=> {
        switch (ans.choice){
            case "add an Engineer":
                addEngineer();
                break;
            case "add an Intern":
                addIntern();
                break;
            case "Quit":
                writeFile();
                break;
            
        }
    })
};

//adds new Engineer and asks for their info, adds team member to the team array
addEngineer = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the Engineer's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the Engineer's ID number?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the Engineer's email?",
        },
        {
            type: "input",
            name: "user",
            message: "What is the Engineer's GitHub username?",
        }
    ]).then((ans) => {
        const engineer = new Engineer (ans.name, ans.id, ans.email, ans.user);
        team.push(engineer);
        addEmployee();
    })
};

//asks for a new Intern and asks for their info, adds team member to the team array
addIntern = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the Intern's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the Intern's ID number?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the Intern's email?",
        },
        {
            type: "input",
            name: "school",
            message: "What school does the Intern attend?",
        }
    ]).then((ans) => {
        const intern = new Intern (ans.name, ans.id, ans.email, ans.school);
        team.push(intern);
        addEmployee();
    })
};

//generates html
writeFile = () => {
    fs.writeFile("index.html", generateHtml(team), (err) =>
        err ? console.log(err) : console.log("Generating Team Member Profiles"))
}

//initializes with first function
addManager();