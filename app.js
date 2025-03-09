import path from "path";
import { fileURLToPath } from "url";
import express from "express";

import custRouter from './routes/DirCustomers/custRouter.js';
import empRouter from './routes/DirEmployees/empRouter.js';

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
  res.render("index.ejs", { info: [] })
});

app.use('/customers', custRouter);

app.use('/employees', empRouter);

// sale page
app.get("/sales", async (req, res) => {
  res.render("sales.ejs", { info: [] })
});

// clothes page
app.get("/clothes", async (req, res) => {
  res.render("clothes.ejs", { info: [] })
});

// manufacturer page
app.get("/manufacturers", async (req, res) => {
  res.render("manufacturers.ejs", { info: [] })
});

// salehas_clothes page
app.get("/salehas_clothes", async (req, res) => {
  res.render("salehas_clothes.ejs", { info: [] })
});

// being buggy right now, so commented it out.
// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

const PORT = 7642;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});