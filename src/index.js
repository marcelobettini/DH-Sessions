const express = require("express");
const session = require("express-session");
const mysqlStore = require("express-mysql-session")(session);
const cookieParser = require("cookie-parser");
const path = require("node:path");

const ONE_YEAR = 100 * 60 * 60 * 24 * 365;
const IS_IN_PROD = process.env.NODE_ENV === "production";

const app = express();

//Template Engine config
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

//form proccessing setup
app.use(express.urlencoded({ extended: false }));

//do we need express.json() ?

//static assets, css, images, etc...
app.use(express.static(path.resolve(__dirname, "public")));
//enable cookies processing
app.use(cookieParser());
app.use((req, res, next) => {
  res.locals.currentRoute = req.path;
  res.locals.user = req.session || "";
  next();
});

//sessions config
const options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234abcd",
  database: "test",
  createDatabaseTable: true,
};
const sessionStore = new mysqlStore(options);
app.use(
  session({
    secret: "supersecreto",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      maxAge: ONE_YEAR,
      sameSite: true,
      secure: IS_IN_PROD,
    },
  })
);

//routing
const moviesRt = require("./features/movies/moviesRt.js");
app.use("/movies", moviesRt);

const homeRt = require("./features/home/homeRt.js");
app.get("/", homeRt);

const authRt = require("./features/auth/authRt.js");
app.use("/auth", authRt);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, (err) => {
  console.log(
    err
      ? `Error launching server: ${err}`
      : `Server running on http://localhost:${PORT}`
  );
});
