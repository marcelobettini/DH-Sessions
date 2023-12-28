const path = require("node:path");
const file = require("../../utils/file.js");
const usersMd = {
  async getAll() {
    const users = await file.read(path.resolve(__dirname, "./users.json"));
    return JSON.parse(users);
  },
  async getByEmail(email) {
    const users = await this.getAll();
    const user = users.find((user) => user.email === email);
    return user;
  },
  async addOne(newUser) {
    const users = await this.getAll();
    users.push(newUser);
    await file.write(
      path.resolve(__dirname, "./users.json"),
      JSON.stringify(users)
    );
    return `new user added: ${newUser}`;
  },
};
module.exports = { usersMd };
