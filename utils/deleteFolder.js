const fs = require('fs');
const inquirer = require("inquirer")

const isExists = dir => {
    return fs.existsSync(dir)
}

const deleteFolder = path => {
    // 判断是否已经存在项目，如果不存在则继续，否则删除
    if (!isExists(path)) return
    // 第一步读取文件内部的文件
    let arr = fs.readdirSync(path);
    // 遍历数组
    for (let i = 0; i < arr.length; i++) {
        // 获取文件的状态
        let stat = fs.statSync(path + '/' + arr[i]);
        // 判断是文件还是文件夹
        if (stat.isDirectory()) {
            // 说明是文件夹  递归调用
            deleteFolder(path + '/' + arr[i]);
        } else {
            // 说明是文件
            fs.unlinkSync(path + '/' + arr[i]);
        }
    }
    // 遍历完成之后 删除最外层的文件
    fs.rmdirSync(path);
}

module.exports = deleteFolder;
