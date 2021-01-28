
const inquirer = require("inquirer")
const fs = require('fs');
const isExists = dir => {
    return fs.existsSync(dir)
}

const promptList = [{
    type: "confirm",
    message: `already exists! continue?`,
    name: "watch",
}];


const confirmFunc = (callback, PName) => {
    // 判断是否已经存在项目，如果不存在则继续，否则删除
    if (isExists(PName)) {
        promptList[0].message = `${PName} already exists! continue?`;
        inquirer.prompt(promptList).then((answers) => {
            // console.log(answers, callback); // 返回的结果
            const { watch } = answers
            watch && callback && callback(PName)
        })
    }else{
        callback(PName)
    }
}

module.exports = {
    confirmFunc
}