
const inquirer = require("inquirer")
const fs = require('fs');

const isExists = dir => {
    return fs.existsSync(dir)
}

const isExistsProject = PName => {
    // 如果没有指定项目名称怎不创建项目
    !PName && console.log(`projectName should not be empty!`)
    return !!PName
}
// 命令行询问弹窗
const confirmFunc = (callback, PName) => {
    // 判断是否已经存在项目，如果不存在则继续，否则删除再重新构建
    if (isExists(PName)) {
        const promptList = [{
            type: "confirm",
            message: `${PName} already exists! continue?`,
            name: "watch",
        }];
        inquirer.prompt(promptList).then((answers) => {
            // console.log(answers, callback); // 返回的结果
            const { watch } = answers
            watch && console.log(`please delete ${PName} first!`)
        })
        return
    }
    listFunc(callback, PName)
}
// 命令行选择项目模板
const listFunc = (callback, PName) => {
    const promptList = [{
        type: 'list',
        message: '请选择一种模板:',
        name: 'template',
        choices: [
            "vue",
            "react",
            "easy-react"
        ],
        // 使用filter将回答变为小写
        filter: value => { return value.toLowerCase() }
    }]
    inquirer.prompt(promptList).then(type => {
        const { template } = type
        callback && callback(PName, template)
    })
}

const inquirerFunc = config => {
    const { downloadGit, PName } = config
    if (!isExistsProject(PName)) return
    confirmFunc(downloadGit, PName)
}
module.exports = inquirerFunc