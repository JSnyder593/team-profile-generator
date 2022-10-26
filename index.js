//import library
const inquirer = require('inquirer');
const Employee = require('./Develop/lib/Employee');
const Engineer = require('./Develop/lib/Engineer');
const Intern = require('./Develop/lib/Intern');
const Manager = require('./Develop/lib/Manager');

const employees = [];
const engineers = [];
const interns = [];
const managers = [];

//prompts for users to input info all roles have in common
function getMember(){
    inquirer.prompt([
        {
            name: "name",
            message: "What is your name?",
            type: "input"
        },
        {
            name: "id",
            message: "What is your ID#?",
            type: "input"
        },
        {
            name: "email",
            message: "What is your email?",
            type: "input"
        },
    ]).then((data) => {
        const emp = new Employee(data.name, data.id, data.email);
        employees.push(emp);
        console.log(employees)
        getRole();
    })
};

//function to pick role
function getRole() {
    inquirer.prompt({
        name: "Role",
        type: "list",
        choices: ["Manager", "Engineer", "Intern"]
    }).then((answers) => {
        switch (answers.Role){
            case "Manager":
                console.log("Input Office#")
                getOffice();
                break;

            case "Engineer":
                console.log("Please input GitHub Username")
                getGithub();
                break;
            
            case "Intern":
                console.log("Where do you attend school?")
                getSchool();
                break;           
        }
    });
};

//functions that ask for more information based on the person's role
function getOffice() {
    inquirer.prompt({
        name: "officenumber",
        message: "What is your Office#?",
        type: "input"
    }).then((data) => {
        const man = new Manager(data.officenumber);
        managers.push(man);
        console.log(managers);
    });
};

function getGithub() {
    inquirer.prompt({
        name: "github",
        message: "What is your Github Username?",
        type: "input"
    }).then((data) => {
        const eng = new Engineer(data.github);
        engineers.push(eng);
        console.log(engineers);
    });
};

function getSchool() {
    inquirer.prompt({
        name: "school",
        message: "Where do you attend school?",
        type: "input"
    }).then((data) => {
        const int = new Intern(data.school);
        interns.push(int);
        console.log(interns);
    });
};

//take answers and have them link to generateHTML.js so they render on the webpage

//initiating function
getMember();

