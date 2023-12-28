const fs = require("node:fs");
const file = {
  async read(file) {
    return new Promise((resolve, reject) => {
      fs.readFile(file, { encoding: "utf-8" }, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  },
  async write(file, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(file, data, { encoding: "utf-8" }, (err, info) => {
        if (err) reject(err);
        resolve(info);
      });
    });
  },
};

module.exports = file;
