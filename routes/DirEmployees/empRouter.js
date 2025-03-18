import express from 'express';

import db from '../db-connector.js'
import queries from './emp-queries.js';

const empRouter = express.Router();

// employees page
empRouter.get('/', async (req, res) => {
  // read most current data from the db
  let [results, fields] = await db.query(queries.read);

  // convert date format of each record in results
  results.forEach(record => {
    // convert the yyyy-mm-dd... format to be in mm/dd/yyyy format
    record['Hire Date'] = record['Hire Date'].toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    })
  });

  // serve the employees webpage back to the user
  res.render('employees', { records: results })
});

// create employee entry
empRouter.post('/create', async (req, res) => {
  try {
    const phone = req.body.phone === "" ? null : req.body.phone
    let [results, fields] = await db.query(queries.create, [req.body.firstName, req.body.lastName, req.body.hireDate, req.body.email, phone]);
    if (results.affectedRows != 1)
      console.log("create failed");
    res.redirect('/employees');
    return
  } catch (error) {
    let errMessage;
    if (error.code === 'ER_DUP_ENTRY') {
      errMessage = `You attempted to enter either a duplicate email or phone number.
      Please ensure that the email or phone number you are attempting to use to make
      the employee record is unique to other existing emails or phone numbers`;
    }
    else
      errMessage = `An unknown error occured with the creation of the record.`;
    res.render('employees', { message: errMessage })
    return
  }
});

// update employee entry data
empRouter.post('/update', async (req, res) => {
  if (req.body.ID !== '0') {
    try {
      const phone = req.body.phone === "" ? null : req.body.phone
      let [results, fields] = await db.query(queries.update, [req.body.firstName, req.body.lastName, req.body.hireDate, req.body.email, phone, req.body.ID]);
      if (results.affectedRows != 1)
        console.log("update failed")

      res.redirect('/employees');
      return
    } catch (error) {
      let errMessage;
      if (error.code === 'ER_DUP_ENTRY') {
        errMessage = `You attempted to enter either a duplicate email or phone number.
      Please ensure that the email or phone number you are attempting to use to update
      the employee record is unique to other existing emails or phone numbers`;
      }
      else
        errMessage = `An unknown error occured with the updating of the record.`;
      res.render('employees', { message: errMessage })
      return
    }
  }
  else {
    let nonValMessage;
    nonValMessage = `You tried to submit the update form with no ID selected. 
    Please select an ID and try again.`
    res.render('employees', { message: nonValMessage })
    return
  }
});

// delete employee entry.
empRouter.post('/delete', async (req, res) => {
  if (req.body.ID !== '0') {
    try {
      let [results, fields] = await db.query(queries.delete, [req.body.ID]);
      if (results.affectedRows != 1)
        console.log("delete failed");

      res.redirect('/employees');
      return
    } catch (error) {
      let errMessage;
      errMessage = `An unknown error occured with the deletion of the record.`;
      res.render('employees', { message: errMessage })
      return
    }
  }
  else {
    let nonValMessage;
    nonValMessage = `You tried to submit the deletion form with no ID selected. 
    Please select an ID and try again.`
    res.render('employees', { message: nonValMessage })
    return
  }
});

export default empRouter;