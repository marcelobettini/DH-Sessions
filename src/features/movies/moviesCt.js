const { moviesMd } = require("./moviesMd.js");
const moviesCt = {
  getAll: async (req, res) => {
    const movies = await moviesMd.getAll();
    res.send(movies);
  },
};

module.exports = moviesCt;
