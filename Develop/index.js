const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const generate = require("./utils/generateMarkdown.js");
const api = require("./utils/api.js");
const path = require("path");
const axios = require('axios');
let email = '';

const questions = [
    {
      type: "input",
      message: "What is your GitHub username?",
      name: "username"
    },
    {
      type: "input",
      message: "What is your email address?",
      name: "email"
    },
    {
      type: "input",
      message: "What is your project's name?",
      name: "projectName"
    },
      {
        type: "input",
        message: "Please provide a short description of your project.",
        name: "description"
      },
      {
        type: "input",
        message: "Please provide a Table of Contents",
        name: "tableOfContents",
        default: "Table of Contents"
      },
      {
          type: "list",
          message: "What kind of license should your project have?",
          name: "license",
          choices: ["MIT", "Apache 2.0", "GPL 3.0", "None"]
      },
      {
        type: "input",
        message: "What command should be run to install dependencies?",
        name: "dependencies",
        default: "npm i"
      },
      {
        type: "input",
        message: "What command should be run to run tests?",
        name: "tests",
        default: "npm test"
      },
      {
        type: "input",
        message: "What do users need to have in order to use the repo?",
        name: "needNode"
      },
      {
        type: "input",
        message: "What do users need to know about contributing to the repo?",
        name: "contributing"
      },
      {
        type: "input",
        message: "Do you have any questions?",
        name: "repoQuestions"
      }
];

function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

function init() {
  inquirer.prompt(questions).then(async function (response) {
    const queryUrl = `https://api.github.com/users/${response.username}`;
    await axios.get(queryUrl).then(function (res) {
    avatarUrl = res.data.avatar_url;
    // getUserProfile(response.username);
    writeToFile("README.md", generate(avatarUrl,{ ...response }));
    email = response.email;
  });
})
}

init();

