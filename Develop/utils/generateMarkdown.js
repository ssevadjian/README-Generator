function generateMarkdown(data) {
  return `
# ${data.projectName}

# Description:
${data.description}

# ${data.tableOfContents}:

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

  `;
}

module.exports = generateMarkdown;
