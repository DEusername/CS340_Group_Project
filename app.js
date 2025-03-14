import path from "path";
import { fileURLToPath } from "url";
import express from "express";

import custRouter from './routes/DirCustomers/custRouter.js';
import empRouter from './routes/DirEmployees/empRouter.js';
import cloRouter from './routes/DirClothes/cloRouter.js';
import manRouter from './routes/DirManufacturers/manRouter.js';
import saleCloRouter from "./routes/DirSaleHasClothes/saleCloRouter.js";

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

app.use('/clothes', cloRouter);

app.use('/manufacturers', manRouter);

app.use('/salehas_clothes', saleCloRouter)

const PORT = 7642;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});