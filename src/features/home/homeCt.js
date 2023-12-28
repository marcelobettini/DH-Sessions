const { moviesMd } = require("../movies/moviesMd.js");
const homeCt = {
  renderIndex: async (req, res) => {
    const data = await moviesMd.getAll();
    const movies = JSON.parse(data);
    res.render("pages/home", { user: req.session.user, movies });
  },
};
module.exports = homeCt;
