const path = require("node:path");
const file = require("../../utils/file.js");
const moviesMd = {
  async getAll() {
    const movies = await file.read(path.resolve(__dirname, "./movies.json"));
    return movies;
  },
};

module.exports = { moviesMd };
