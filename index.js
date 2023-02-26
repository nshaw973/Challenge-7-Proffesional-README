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
    const {title, description, license, github, email} = data;

    const htmlIndex = `
    ${title}
    ${description}
    ${license}
    ${github}
    ${email}`;

    fs.writeFile(`${title}.md`, htmlIndex, (err) => err 
    ? console.log(err) 
    : console.log('Generating a README.md file...'));
    });