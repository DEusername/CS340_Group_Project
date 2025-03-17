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
  if (req.body.Customers_idCustomer !== '0' && req.body.Employees_idEmployee !== '0') {
    let employeeID = req.body.Employees_idEmployee === "N/A" ? null : req.body.Employees_idEmployee;
    let [results, fields] = await db.query(queries.create, [req.body.discountPercent, req.body.payment, req.body.date, req.body.Customers_idCustomer, employeeID]);
    if (results.affectedRows != 1)
      console.log("create failed");

    res.redirect('/sales');
    return;
  }
  else {
    let nonValMessage;
    nonValMessage = `You tried to submit the create form with no dropdown 
    item selected for a record. Please make sure all dropdowns are filled with 
    adequate information.`
    res.render('sales', { message: nonValMessage })
    return
  }
});

// update sale entry data
salRouter.post('/update', async (req, res) => {
  if (req.body.ID !== '0') {
    if (req.body.Customers_idCustomer !== '0' && req.body.Employees_idEmployee !== '0') {
      let employeeID = req.body.Employees_idEmployee === "N/A" ? null : req.body.Employees_idEmployee;
      let [results, fields] = await db.query(queries.update, [req.body.discountPercent, req.body.payment, req.body.date, req.body.Customers_idCustomer, employeeID, req.body.ID]);
      if (results.affectedRows != 1)
        console.log("update failed");

      res.redirect('/sales');
      return
    } else {
      let nonValMessage;
      nonValMessage = `You tried to submit the update form with no dropdown 
      item selected for a record. Please make sure all dropdowns are filled with 
      adequate information.`
      res.render('sales', { message: nonValMessage })
      return
    }
  }
  else {
    let nonValMessage;
    nonValMessage = `You tried to submit the update form with no ID selected. 
    Please select an ID and try again.`
    res.render('sales', { message: nonValMessage })
    return
  }
});

// delete sale entry
salRouter.post('/delete', async (req, res) => {
  if (req.body.ID !== '0') {
    try {
      let [results, fields] = await db.query(queries.delete, [req.body.ID]);
      if (results.affectedRows != 1)
        console.log("delete failed");

      res.redirect('/sales');
      return
    } catch (error) {
      let errMessage;
      errMessage = `An unknown error occured with the deletion of the record.`;
      res.render('sales', { message: errMessage })
      return
    }
  }
  else {
    let nonValMessage;
    nonValMessage = `You tried to submit the deletion form with no ID selected. 
    Please select an ID and try again.`
    res.render('sales', { message: nonValMessage })
    return
  }
});

export default salRouter;