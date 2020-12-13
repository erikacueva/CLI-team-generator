const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const team = [];

const managerPrompts = [
  {
    type: "input",
    name: "name",
    message: "What is the Manager's name?",
  },
  {
    type: "input",
    name: "id",
    message: "What is the Manager's ID?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the Manager's email address?",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is the Manager's office number?",
  },
];

const engineerPrompts = [
  {
    type: "input",
    name: "name",
    message: "What is the Engineer's name?",
  },
  {
    type: "input",
    name: "id",
    message: "What is the Engineer's ID?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the Engineer's email address?",
  },
  {
    type: "input",
    name: "github",
    message: "What is the Engineer's GitHub url?",
  },
];

const internPrompts = [
  {
    type: "input",
    name: "name",
    message: "What is the Intern's name?",
  },
  {
    type: "input",
    name: "id",
    message: "What is the What is the Intern's ID?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the Intern's email address?",
  },
  {
    type: "input",
    name: "school",
    message: "What is the Intern's school?",
  },
];

const moreEmployee = [
    {
    type: "list",
    message: "Add another employee?",
    name: "addEmployee",
    choices: [
        "engineer",
        "intern",
        "none"
    ]}
];

function init() {
  inquirer.prompt(managerPrompts).then((response) => {
    const manager = new Manager(
      response.name,
      response.id,
      response.email,
      response.officeNumber
    );
    console.log(manager);
    team.push(manager);
    addEmployee();
    //define add employee outside of init function
  });


  function createEngineer() {
    inquirer.prompt(engineerPrompts).then((response) => {
        const engineer = new Engineer(
            response.name,
            response.id,
            response.email,
            response.github,
        );
        console.log(engineer);
        team.push(engineer);
        addEmployee()

      //create new engineer class instance
      //push to team array
      //add employee function - ask who you want to add
    });
  };

  function createIntern() {
    inquirer.prompt(internPrompts).then((response) => {
        const intern = new Intern(
            response.name,
            response.id,
            response.email,
            response.school,
        );
        console.log(intern);
        team.push(intern);
        addEmployee()

      //create new engineer class instance
      //push to team array
      //add employee function - ask who you want to add
    });
  };

  function addEmployee() {
      inquirer.prompt(moreEmployee)
        .then((response) => {
            switch (response.addEmployee) {
                case "engineer":
                    createEngineer()
                    break
                case "intern":
                    createIntern()
                    break
                case "none":
                fs.writeFile(outputPath, render(team), (err) =>
                err ? console.error(err) : console.log("Your Team has been rendered succesfully!")
                )
                break
            }
        });
  }
  

  //   engineer prompt/engineer prompts/add another employee prompts

  // if no, render(team); save into a variable. variable goes into fs
}

init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.





