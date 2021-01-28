const chalk = require('chalk');
const download = require('../utils/git-template')
const ora = require('ora');
const deleteFolder = require('../utils/deleteFolder');
const tpls = require('../utils/templates.json')
const inquirer = require('../utils/inquirer')

const downloadGit = (PName, template) => {
    console.log(chalk.greenBright('\n Start generating... \n'));
    // 加载图标
    deleteFolder('./' + PName);
    const spinner = ora('Downloading...');
    spinner.start();
    // 从vue和react两个模板中选择一个
    const [repository] = tpls.filter(type => { return type.name === template });
    const url = repository ? repository.url : tpls[0].url //如果repository没有值默认使用vue
    download(url, PName).then((err) => {
        spinner.succeed();
        if (err) {
            console.log(chalk.red('\n clone project template exception'));
            console.log(`\n ${err}`);
            return
        }
        console.log(chalk.cyanBright(`\nGeneration completed!\ncd ${PName}\nyarn\nyarn start`));
    });
}
module.exports = PName => {
    inquirer.confirmFunc(downloadGit, PName)
}