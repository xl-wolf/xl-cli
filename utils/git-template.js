const download = require('download-git-repo')

module.exports = (repository, projectName) => new Promise((resolve, reject) => {
  download(repository, projectName, { clone: true },  err => {
    resolve(err)
  })
})
