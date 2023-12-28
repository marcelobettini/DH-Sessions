const crypto = require("node:crypto");
const { usersMd } = require("../users/usersMd.js");
const { passHash } = require("../../utils/passHash.js");
const auth = {
  loginForm: (req, res) => {
    res.render("pages/login", { prevValues: {}, errors: [] });
  },
  loginProcess: async (req, res) => {
    const { email, password } = req.body;
    const isUser = await usersMd.getByEmail(email);
    if (!isUser) {
      return res.send("email o contraseña incorrectos");
    }
    const passwordOk = await passHash.decrypt(password, isUser.password);
    if (!passwordOk) {
      return res.send("email o contraseña incorrectos");
    }
    req.session.user = req.body;
    res.locals.user = req.session.user;
    req.session.save((err) => {
      if (err) {
        console.error(err);
      }
      res.redirect("/");
    });
  },
  registerForm: (req, res) => {
    res.render("pages/register", { prevValues: {}, errors: [] });
  },
  registerProcess: async (req, res) => {
    const { name, email, password } = req.body;
    const pass = await passHash.encrypt(password);
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password: pass,
    };
    await usersMd.addOne(newUser);
    res.send("ok");
  },
};
module.exports = auth;
