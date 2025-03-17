import express from 'express';

import db from '../db-connector.js'
import queries from './man-queries.js';

const manRouter = express.Router();

// manufacturers page
manRouter.get('/', async (req, res) => {
  // read most current data from the db
  let [results, fields] = await db.query(queries.read);

  // serve the manufacturers webpage back to the user
  res.render('manufacturers', { records: results })
});

// create manufacturer entry
manRouter.post('/create', async (req, res) => {
  let [results, fields] = await db.query(queries.create, [req.body.name, req.body.email, req.body.phone, req.body.address]);
  if (results.affectedRows != 1)
    console.log("create failed");

  res.redirect('/manufacturers');
});

// update manufacturer entry data
manRouter.post('/update', async (req, res) => {
  if (req.body.ID !== '0') {
    let [results, fields] = await db.query(queries.update, [req.body.name, req.body.email, req.body.phone, req.body.address, req.body.ID]);
    if (results.affectedRows != 1)
      console.log("update failed");
    res.redirect('/manufacturers');
    return
  }
  else {
    let nonValMessage;
    nonValMessage = `You tried to submit the update form with no ID selected. 
    Please select an ID and try again.`
    res.render('manufacturers', { message: nonValMessage })
    return
  }
});

// delete manufacturer entry
manRouter.post('/delete', async (req, res) => {
  if (req.body.ID !== '0') {
    try {
      let [results, fields] = await db.query(queries.delete, [req.body.ID]);
      if (results.affectedRows != 1)
        console.log("delete failed");
      res.redirect('/manufacturers');
      return
    } catch (error) {
      let errMessage;
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        errMessage = `A referential error occured. Please ensure you delete all 
        Clothes records that were made by the Manufacturer you just attempted to delete.
        Then you may delete this Manufacturer.`;
      }
      else
        errMessage = `An unknown error occured with the deletion of the record.`;
      res.render('manufacturers', { message: errMessage })
      return
    }
  }
  else {
    let nonValMessage;
    nonValMessage = `You tried to submit the deletion form with no ID selected. 
    Please select an ID and try again.`
    res.render('manufacturers', { message: nonValMessage })
    return
  }
});

export default manRouter;