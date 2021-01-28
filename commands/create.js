// const inquirer = require('inquirer')
const chalk = require('chalk');
const download = require('../utils/git-template')
const ora = require('ora');
const deleteFolder = require('../utils/deleteFolder');
const tpls = require('../utils/templates.json')
const inquirer = require('../utils/inquirer')

const downloadGit = (PName) => {
    console.log(chalk.greenBright('\n Start generating... \n'));
    // 加载图标
    deleteFolder('./' + PName);
    const spinner = ora('Downloading...');
    spinner.start();
    const repository = tpls[0].url;
    download(repository, PName).then((err) => {
        spinner.succeed();
        if (err) {
            console.log(chalk.red('\n clone project template exception'));
            console.log(`\n ${err}`);
            return
        }
        console.log(chalk.cyanBright(`\nGeneration completed!\ncd ${PName}\nyarn\nyarn start`));
    });
}
// console.log(tpls)
module.exports = PName => {
    inquirer.confirmFunc(downloadGit, PName)
}