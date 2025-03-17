import express from 'express';

import db from '../db-connector.js'
import queries from './sal-queries.js';

const salRouter = express.Router();

// sales page
salRouter.get('/', async (req, res) => {
  // read most current data from the db
  let [results, fields] = await db.query(queries.read);
  let [CustInfoResults, CustInfoFields] = await db.query(queries.getCustInfo);
  let [EmpInfoResults, EmpInfoFields] = await db.query(queries.getEmpInfo);

  // serve the sales webpage back to the user
  res.render('sales', { records: results, custInfo: CustInfoResults, empInfo: EmpInfoResults })
});

// create sale entry
salRouter.post('/create', async (req, res) => {
  let employeeID = req.body.Employees_idEmployee === "N/A" ? null : req.body.Employees_idEmployee;
  let [results, fields] = await db.query(queries.create, [req.body.discountPercent, req.body.payment, req.body.date, req.body.Customers_idCustomer, employeeID]);
  if (results.affectedRows != 1)
    console.log("create failed");

  res.redirect('/sales');
});

// update sale entry data
salRouter.post('/update', async (req, res) => {
  let employeeID = req.body.Employees_idEmployee === "N/A" ? null : req.body.Employees_idEmployee;
  let [results, fields] = await db.query(queries.update, [req.body.discountPercent, req.body.payment, req.body.date, req.body.Customers_idCustomer, employeeID, req.body.ID]);
  if (results.affectedRows != 1)
    console.log("update failed");

  res.redirect('/sales');
});

// delete sale entry
salRouter.post('/delete', async (req, res) => {
  let [results, fields] = await db.query(queries.delete, [req.body.ID]);
  if (results.affectedRows != 1)
    console.log("delete failed");

  res.redirect('/sales');
});

export default salRouter;