// const inquirer = require('inquirer')
const chalk = require('chalk');
const download = require('../utils/git-template')
const ora = require('ora');
const deleteFolder = require('../utils/deleteFolder');
const program = require('commander')
const inquirer = require('../utils/inquirer')
if (program.args.length < 1) {
    return program.help();
}
// 解析命令行获取项目名称
const PName = program.args[1];

if (!PName) { return console.log(chalk.red('\n projectName should not be empty \n')) }

// direct: 不可以省略
const repository = 'direct:https://github.com/xl-wolf/vue-template.git';
module.exports = () => {
    inquirer.confirmFunc(downloadGit,PName)
    function downloadGit() {
        console.log(chalk.greenBright('\n Start generating... \n'));
        // 加载图标
        const spinner = ora('Downloading...');
        spinner.start();

        deleteFolder('./' + PName);
        download(repository, PName).then((err) => {
            spinner.succeed();
            if (err) {
                console.log(chalk.red('\n clone project template exception'));
                console.log(`\n ${err}`);
            } else {
                console.log(chalk.green('\n Generation completed!'));
            }
        });
    }
}