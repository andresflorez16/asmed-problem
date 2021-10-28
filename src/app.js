const path = require("path");
const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const { connect } = require("mongoose");

const indexRoutes = require("./routes/index.js");

const app = express();

// settings
(async () => {
  try {
    const db = await connect("mongodb://localhost/crud-mongo");
    console.log("Db connectect to", db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaulLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", indexRoutes);

app.use((req, res, next) => {
  res.status(404).render("404");
});

app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
