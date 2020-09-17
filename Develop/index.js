const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const generate = require("./utils/generateMarkdown.js");
const api = require("./utils/api.js");
const path = require("path");
const axios = require('axios');
let email = '';
let divider = '# ';

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
    inquirer.prompt(questions).then((response) => {
        writeToFile("README.md", generate(response));
        getUserProfile(response.username);
        email = response.email;
      });
    }

init();

function getUserProfile(username) {
  const queryUrl = `https://api.github.com/users/${username}`;
  axios.get(queryUrl).then(function(res) {
    const avatarUrl = res.data.avatar_url;
    console.log('my avatar is', avatarUrl);
    fs.appendFileSync('README.md', divider + ' Avatar Url:' + '\n' + avatarUrl + '\n' + '\n');
    fs.appendFileSync('README.md', divider + ' Email Address:' + '\n' + email);
  });
}

//create function to run API and axios parameters - 
 
// Get Porfile Pic and Email.
// module.exports = async function getUserProfile(username) {
//   let res = {};
//   await axios
//     .get(`https://api.github.com/users/${username}`)
//     .then(({ data: { avatar_url } }) => {
//       res = { avatar_url, isValid: true };
//       console.log('this is my git request');
//     })
//     .catch((err) => {
//       console.log(err.message);
//       res = { avatar_url: false, isValid: false, message: err.message };
//     });
//   return res;
// };