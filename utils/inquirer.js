
const inquirer = require("inquirer")

const promptList = [{
    type: "confirm",
    message: `already exists! continue?`,
    name: "watch",
}];


const confirmFunc = (callback, PName) => {
    promptList[0].message = `${PName} already exists! continue?`;
    inquirer.prompt(promptList).then((answers) => {
        // console.log(answers, callback); // 返回的结果
        const { watch } = answers
        watch && callback && callback()
    })
}

module.exports = {
    confirmFunc
}