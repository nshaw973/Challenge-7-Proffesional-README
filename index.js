const inquirer = require('inquirer');
const fs = require('fs');

//This will be used to merge the data from the multiple prompts so that it's just one array that is beig used to populate the readme.
const mergeData = [];

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
            message: 'What motivated this project?',
            name: 'motivation'
        },
        {
            type: 'input',
            message: 'Why did you build this project?',
            name: 'build'
        },
        {
            type: 'input',
            message: 'What problem does this project solve?',
            name: 'problem'
        },
        {
            type: 'input',
            message: 'What did you learn?',
            name: 'learn'
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
            type: 'confirm',
            message: 'Are there any contributors?',
            name: 'contYN',
        },
    ])
    .then((data) => {

        //Takes the data and adds them to the merge data array.
        mergeData.push(data)

        //If the user says there are more contributors, then it takes them into the contributor loop function
        if (data.contYN) {
            contributorLoop();
        } else {
        //If the user says no, then it skips over the next set of prompts and takes them to the last part of the questionare.
            continuePrompts();
        };

        //This will contain all the contributors and their github usernames into a single array.
        const contributorArray = [] 

        //This will loop through as long as the user keeps saying yes to more contributors
        function contributorLoop(){
            inquirer 
            .prompt ([
                {
                    type: 'input',
                    message: 'Provide the name of a contributor.',
                    name: 'credits',
                },
                {
                    type: 'input',
                    message: 'Provide the users github username.',
                    name: 'contGit',
                },  
                {
                    type: 'confirm',
                    message: 'Are there any MORE contributors?',
                    name: 'addCont',
                },
            ])
            .then((data) => {

                //This push takes the data and places it into a string that will then be used to creat a dotted list so that each
                //contributor gets their own line.
                contributorArray.push(`- ${data.credits} Github: [${data.contGit}](https://github.com/${data.contGit})\n`);
                if (data.addCont) {
                    contributorLoop();
                } else {
                //Once the user says no, it moves on to the rest of the questionare.
                    continuePrompts();
                }
            }
            )
        };

        function continuePrompts(){
        inquirer
        .prompt ([
            {
                type: 'input',
                message: 'Provide any test instructions.',
                name: 'testInst'
            },
            {
                type: 'list',
                message: 'Choose a License from the list.',
                name: 'license',
                choices: ['Apache License 2.0', 'GNU GPLv3', 'MIT', 'Mozilla Public License 2.0', 'Boost Software License 1.0']
            },
            {
                type: 'input',
                message: 'What is your name?',
                name: 'name'
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

            //Second set of data gets added to the mergeData array.
            mergeData.push(data);

            //Because the two data objects are seperate in the array, this spread operator merges the objects in the array,
            //which then we deconstruct and then we get all the variables needed to fill out the readme.
            const fullData = {...mergeData[0], ...mergeData[1]}
            const {title, description, motivation, build, problem, learn, installProcess, usage, testInst, license, name, github, email} = fullData
        
            const readmeData = `
                # ${title}
        
                ![lincense Badge](https://img.shields.io/static/v1?label=license&message=${license.replaceAll(' ', '-')}&color=blue)
                ## Description
        
                ${description}

                - ${motivation}
                - ${build}
                - ${problem}
                - ${learn}
        
                ## Table of Contents
        
                - [Installation](#installation)
                - [Usage](#usage)
                - [Credits](#credits)
                - [License](#license)
                - [Questions](#questions)
        
                ## Installation
        
                ${installProcess}
        
                ## Usage
        
                ${usage}
        
                ## Credits

                - ${name} Github: [${github}](https://github.com/${github})
                ${contributorArray.join('')}
        
                ## Tests
        
                ${testInst}
        
                ## License
        
                ${license} license.

                Please see license.txt file for additional info on license.
        
                ## Questions
        
                Reach out to me (${name}) via either my github, or email!
        
                My Github username: [${github}](https://github.com/${github})
        
                My email adress: [${email}](${email})`;
        
            //This fs.writeFile generates the readme into the ./Generated Readme Folder.
            //Using Regex to remove the indentation created in the code so that we can have a nice looking code block.
            fs.writeFile(`./Generated Readme/README.md`, readmeData.trim().replace(/^ +/gm, ''), (err) => err 
            ? console.log(err) 
            : console.log('Generating a README.md file...'));

            //Copies the license that the user had chosen and then moves that copy into the ./Generated Readme folder to conincide with the users choice.
            fs.copyFile(`./license/${license}.txt`, `./Generated Readme/license.txt`, (err) => err 
            ? console.log(err) 
            : console.log('Generating license file...'));
            })
        }
    })