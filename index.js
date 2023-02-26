const inquirer = require('inquirer');

inquirer 
    .prompt ([
        {
            type: 'input',
            message: 'What is the Title of your Project?',
            name: 'Title'
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
    .then((data) =>
    console.log(data)
    )