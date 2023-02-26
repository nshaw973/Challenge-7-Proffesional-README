const inquirer = require('inquirer');
const fs = require('fs');

inquirer 
    .prompt ([
        {
            type: 'input',
            message: 'What is the Title of your Project?',
            name: 'title'
        },
        {
            type: 'input',
            message: 'Provide a description of your project.',
            name: 'description'
        },
        {
            type: 'input',
            message: 'Provide installation process.',
            name: 'installProcess'
        },
        {
            type: 'input',
            message: 'Provide usage information.',
            name: 'usage'
        },
        {
            type: 'input',
            message: 'Provide any contibution guidelines.',
            name: 'credits'
        },
        {
            type: 'input',
            message: 'Provide any test instructions.',
            name: 'testInst'
        },
        {
            type: 'list',
            message: 'Choose a License from the list.',
            name: 'license',
            choices: ['Apache License 2.0', 'GNU GPLv3', 'MIT', 'ISC License', 'Boost Software License 1.0']
        },
        {
            type: 'input',
            message: 'What is your Github Username?',
            name: 'github'
        },
        {
            type: 'input',
            message: 'What is your email adress?',
            name: 'email'
        },
    ])
    .then((data) => {
    console.log(data);
    const {title, description, installProcess, usage, credits, testInst, license, github, email} = data;

    const readmeData = `
    
# ${title}

![lincense Badge](https://img.shields.io/static/v1?label=license&message=${license.replaceAll(' ', '-')}&color=blue)
## Description

${description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

${installProcess}

## Usage

${usage}

## Credits

${credits}

## Tests

${testInst}

## License

${license}

## Questions

Reach out to me via either my github, or email!

My Github username: [Github](https://github.com/${github})

My email adress: [email](${email})`;

    fs.writeFile(`${title}.md`, readmeData.trim(), (err) => err 
    ? console.log(err) 
    : console.log('Generating a README.md file...'));
    });