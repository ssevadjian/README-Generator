function generateMarkdown(data) {
  return `
# ${data.projectName}
# ${data.description}
# ${data.license}

  `;
}

module.exports = generateMarkdown;
