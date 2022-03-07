#!/usr/bin/env node

// var spawnSync = require('child_process').spawnSync
// const myArgs = process.argv.slice(2);
// var fs = require('fs');


// var FAILURE = 'failure'
// var SUCCESS = 'success'

// // disable https://scarf.sh/
// // which is used by some projects dependencies
// process.env.SCARF_ANALYTICS = false

// var styles = {
//     // got these from playing around with what I found from:
//     // https://github.com/istanbuljs/istanbuljs/blob/0f328fd0896417ccb2085f4b7888dd8e167ba3fa/packages/istanbul-lib-report/lib/file-writer.js#L84-L96
//     // they're the best I could find that works well for light or dark terminals
//     success: { open: '\u001b[32;1m', close: '\u001b[0m' },
//     danger: { open: '\u001b[31;1m', close: '\u001b[0m' },
//     info: { open: '\u001b[36;1m', close: '\u001b[0m' },
//     subtitle: { open: '\u001b[2;1m', close: '\u001b[0m' },
// }

// function color(modifier, string) {
//     return styles[modifier].open + string + styles[modifier].close
// }

// function run(title, subtitle, command, options) {
//     options = options || {}

//     console.log(color('info', '    ▶️  Starting: ' + title))
//     console.log(color('subtitle', '          ' + subtitle))
//     console.log(color('subtitle', '          Running the following command: ' + command))

//     var result = spawnSync(command, { stdio: 'inherit', shell: true })

//     if (result.status !== 0 && !options.ignoreFailure) {
//         console.error(
//             color(
//                 'danger',
//                 '    🚨  Failure: ' +
//                 title +
//                 '. Please review the messages above for information on how to troubleshoot and resolve this issue.',
//             ),
//         )
//         process.exit(result.status)
//         return FAILURE
//     }

//     console.log(color('success', '    ✅  Success: ' + title + '\n\n'))
//     return SUCCESS
// }

// function main() {
//     var result

//     console.log(myArgs)
//     switch (myArgs[0]) {
//         case 'component':
//             console.log(myArgs[1], 'smells quite badly.');
//             const command = 'mkdir src/' + myArgs[1]
//             console.log(command)
//             result = run(
//                 'Generating a component',
//                 'Generating on this computer.',
//                 // eslint-disable-next-line no-template-curly-in-string
//                 command,
//             )
//             // eslint-disable-next-line no-useless-concat
//             const command_ = 'touch src/' + myArgs[1] + '/' + '{' + myArgs[2] + '.tsx,' + myArgs[2] + '.css}'
//             console.log(command_)
//             result = run(
//                 'Generating a component',
//                 'Generating on this computer.',
//                 command_,
//             )

//             const fileRoute = 'src/components/' + myArgs[2] + '.tsx'
            
//             result = run(
//                 'Write a component',
//                 'Generating on this computer.',
//                 'echo' +  fileRoute,
//             )

//             break;
//         case 'compliment':
//             console.log(myArgs[1], 'is really cool.');
//             break;
//         default:
//             console.log('Sorry, that is not something I know how to do.');
//     }


//     if (result === FAILURE) return
//     result = run(
//         'Generating a compononent',
//         'Generating on this computer.',
//         'touch src/components/Sidebar/{Sidebar.tsx,style.css}',
//     )
//     // if (result === FAILURE) return
//     process.exit(SUCCESS)
// }

// main()


const path = require('path')
const fs = require('fs')
const inquirer = require('inquirer')
const chalk = require('chalk')
const ejs = require('ejs')
const shell = require('shelljs')

const CHOICES = fs.readdirSync(path.join(__dirname, 'templates'));
const QUESTIONS = [
{
    name: 'template',
    type: 'list',
    message: 'What template would you like to use?',
    choices: CHOICES
},
{
    name: 'name',
    type: 'input',
    message: 'Please input a new name:'
}];


const CURR_DIR = process.cwd();

inquirer.prompt(QUESTIONS).then(answers => {
    const projectChoice = answers['template'];
    const projectName = answers['name'];
    //@ts-ignore
    const templatePath = path.join(__dirname, 'templates', projectChoice);
    //@ts-ignore
    const tartgetPath = path.join(projectChoice === 'component' ? CURR_DIR + '/src/components/' : CURR_DIR, projectName);
    
    const options = {
        //@ts-ignore
        projectName,
        //@ts-ignore
        templateName: projectChoice,
        templatePath,
        tartgetPath
    }

    if (!createProject(tartgetPath)) {
        return;
    }

    //@ts-ignore
    createDirectoryContents(templatePath, projectName);

    postProcess(options);
});

function createProject(projectPath) {
    if (fs.existsSync(projectPath)) {
        console.log(chalk.red(`Folder ${projectPath} exists. Delete or use another name.`));
        return false;
    }
    fs.mkdirSync(projectPath);
    
    return true;
}

const SKIP_FILES = ['node_modules', '.template.json'];

function createDirectoryContents(templatePath, projectName) {
    // read all files/folders (1 level) from template folder
    const filesToCreate = fs.readdirSync(templatePath);
    // loop each file/folder
    filesToCreate.forEach(file => {
        const origFilePath = path.join(templatePath, file);
        
        // get stats about the current file
        const stats = fs.statSync(origFilePath);
    
        // skip files that should not be copied
        if (SKIP_FILES.indexOf(file) > -1) return;
        
        if (stats.isFile()) {
            // read file content and transform it using template engine
            let contents = fs.readFileSync(origFilePath, 'utf8');
            // contents = template.render(contents, { projectName });
            contents = ejs.render(contents, { projectName });
            // write file to destination folder
            const writePath = path.join(CURR_DIR, projectName, file);
            fs.writeFileSync(writePath, contents, 'utf8');
        } else if (stats.isDirectory()) {
            // create folder in destination folder
            fs.mkdirSync(path.join(CURR_DIR, projectName, file));
            // copy files/folder inside current folder recursively
            createDirectoryContents(path.join(templatePath, file), path.join(projectName, file));
        }
    });
}

function postProcess(options) {
    const isNode = fs.existsSync(path.join(options.templatePath, 'package.json'));
    if (isNode) {
        shell.cd(options.tartgetPath);
        const result = shell.exec('npm install');
        if (result.code !== 0) {
            return false;
        }
    }
    
    return true;
}


