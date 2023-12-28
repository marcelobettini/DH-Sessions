const bcrypt = require("bcrypt");
const saltRound = 10;
const passHash = {
  encrypt: async (userOriginalPassword) => {
    return await bcrypt.hash(userOriginalPassword, saltRound);
  },
  decrypt: async (userOriginalPassword, hashedpassword) => {
    return await bcrypt.compare(userOriginalPassword, hashedpassword);
  },
};

module.exports = { passHash };
