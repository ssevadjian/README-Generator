function generateMarkdown(avatarUrl, data) {
  return `
# ${data.projectName}

# Description:
${data.description}

# ${data.tableOfContents}
1. Installation
2. Usage
3. License
3. Contributing
4. Tests
5. Questions

# Installation:
${data.dependencies}

# Usage:
${data.needNode}

# License:
${data.license}

# Contributing:
${data.contributing}

# Tests:
${data.tests}

# Questions:
${data.repoQuestions}

<img src= "${avatarUrl}" style="border-radius: 25px">
  `;
}

module.exports = generateMarkdown;
