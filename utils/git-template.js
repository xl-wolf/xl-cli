const download = require('download-git-repo');

module.exports = (repository, projectName) => {
  return new Promise((resolve, reject) => {
    download(repository, projectName, { clone: true }, function (err) {
      resolve(err);
    });
  });
};
