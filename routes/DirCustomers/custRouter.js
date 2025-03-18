import express from 'express';

import db from '../db-connector.js'
import queries from './cust-queries.js';

const custRouter = express.Router();

// customers page
custRouter.get('/', async (req, res) => {
  // read most current data from the db
  let [results, fields] = await db.query(queries.read);
  console.log(results);

  // serve the customers webpage back to the user
  res.render('customers', { records: results })
});

// create customer entry
custRouter.post('/create', async (req, res) => {
  try {
    const email = req.body.email === "" ? null : req.body.email
    const phone = req.body.phone === "" ? null : req.body.phone
    let [results, fields] = await db.query(queries.create, [req.body.firstName, req.body.lastName, email, phone]);
    if (results.affectedRows != 1)
      console.log("create failed");
    res.redirect('/customers');
    return
  } catch (error) {
    let errMessage;
    if (error.code === 'ER_DUP_ENTRY') {
      errMessage = `You attempted to enter either a duplicate email or phone number.
      Please ensure that the email or phone number you are attempting to use to make
      the customer record is unique to other existing emails or phone numbers`;
    }
    else
      errMessage = `An unknown error occured with the creation of the record.`;
    res.render('customers', { message: errMessage })
    return
  }
});

// update customer entry data
custRouter.post('/update', async (req, res) => {
  if (req.body.ID !== '0') {
    try {
      const email = req.body.email === "" ? null : req.body.email
      const phone = req.body.phone === "" ? null : req.body.phone
      let [results, fields] = await db.query(queries.update, [req.body.firstName, req.body.lastName, email, phone, req.body.ID]);
      if (results.affectedRows != 1)
        console.log("update failed")
      res.redirect('/customers');
      return
    } catch (error) {
      let errMessage;
      if (error.code === 'ER_DUP_ENTRY') {
        errMessage = `You attempted to enter either a duplicate email or phone number.
      Please ensure that the email or phone number you are attempting to use to update
      the customer record is unique to other existing emails or phone numbers`;
      }
      else
        errMessage = `An unknown error occured with the creation of the record.`;
      res.render('customers', { message: errMessage })
      return
    }
  }
  else {
    let nonValMessage;
    nonValMessage = `You tried to submit the update form with no ID selected. 
    Please select an ID and try again.`
    res.render('customers', { message: nonValMessage })
    return
  }
});

// delete customer entry.
custRouter.post('/delete', async (req, res) => {
  if (req.body.ID !== '0') {
    try {
      let [results, fields] = await db.query(queries.delete, [req.body.ID]);
      if (results.affectedRows != 1)
        console.log("delete failed");
      res.redirect('/customers');
      return
    } catch (error) {
      let errMessage;
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        errMessage = `A referential error occured. Please ensure you delete all 
        Sales records that involved the Customer you just attempted to delete.
        Then you may delete the Customer record you tried to delete.`;
      }
      else
        errMessage = `An unknown error occured with the deletion of the record.`;
      res.render('customers', { message: errMessage })
      return
    }
  }
  else {
    let nonValMessage;
    nonValMessage = `You tried to submit the deletion form with no ID selected. 
    Please select an ID and try again.`
    res.render('customers', { message: nonValMessage })
    return
  }
});

export default custRouter;