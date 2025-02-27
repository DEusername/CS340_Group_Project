import path from "path";
import { fileURLToPath } from "url";
import express from "express";

// Get the filename and directory name
const __filename = fileURLToPath(import.meta.url);
const DIRNAME = path.dirname(__filename);

// Create an express app
const app = express();

// view engine setup
app.set("views", path.join(DIRNAME, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(DIRNAME, "public")));

// initial index page loading
app.get("/", async (req, res) => {
  // res.sendFile("/index.html");

  res.render("index.ejs", { info: [] })
});

// initial index page loading
app.get("/manufacturers", async (req, res) => {
  // res.sendFile("/index.html");

  res.render("manufacturers.ejs", { info: [] })
});

// catch any other route and send 404
app.use(function (req, res, next) {
  res.status = 404;
  let fileName = DIRNAME + "/public/404.html"
  res.sendFile(fileName);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const PORT = 7642;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});