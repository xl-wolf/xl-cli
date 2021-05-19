
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
  // 判断是否已经存在项目，如果不存在则继续，否则删除
  if (isExists(PName)) {
    const promptList = [{
      type: "confirm",
      message: `${PName} already exists! continue?`,
      name: "watch",
    }];
    inquirer.prompt(promptList).then((answers) => {
      // console.log(answers, callback); // 返回的结果
      const { watch } = answers
      watch && callback && callback(PName)
    })
  } else {
    const promptList = [{
      type: 'list',
      message: '请选择一种模板:',
      name: 'template',
      choices: [
        "vue",
        "react"
      ],
      // 使用filter将回答变为小写
      filter: (val) => { return val.toLowerCase() }
    }]
    inquirer.prompt(promptList).then((type) => {
      const { template } = type
      switch (template) {
        case 'vue':
          callback && callback(PName, template)
          break
        case 'react':
          callback && callback(PName, template)
          break
        default:
          break
      }

    })
  }
}

module.exports = {
  confirmFunc
}
